import { test, expect } from "@playwright/test";

const E2E_REGISTER_REGULAR_USER = {
  name: "E2E test user",
  email: "e2eRegister@email.com",
  passoword: "StrongPass@123",
  confirmPassword: "StrongPass@123",
};

test.describe("Register", () => {
  test("Should register user and redirect to login page '/'", async ({
    page,
  }) => {
    await page.goto("/register");

    await page
      .getByRole("textbox", { name: "Nome", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.name);

    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.email);

    await page
      .getByRole("textbox", { name: "Senha", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.passoword);

    await page
      .getByRole("textbox", { name: "Confirmar senha", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.confirmPassword);

    await page.getByRole("button", { name: "Criar" }).click();

    await expect(page).toHaveURL(/.*\//, { timeout: 20000 });
  });

  test("Should show validation error for invalid email", async ({ page }) => {
    await page.goto("/register");

    await page
      .getByRole("textbox", { name: "Nome", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.name);

    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("invalid-email@invalid");

    await page
      .getByRole("textbox", { name: "Senha", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.passoword);

    await page
      .getByRole("textbox", { name: "Confirmar senha", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.confirmPassword);

    await page.getByRole("button", { name: "Criar" }).click();

    const errorMessage = page.getByText(/E-mail inválido./i);

    await expect(errorMessage).toBeVisible();
  });

  test("Should show generic error for invalid or existent credentials", async ({
    page,
  }) => {
    await page.goto("/register");

    await page
      .getByRole("textbox", { name: "Nome", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.name);

    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("testuser2e2fe@email.com");

    await page
      .getByRole("textbox", { name: "Senha", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.passoword);

    await page
      .getByRole("textbox", { name: "Confirmar senha", exact: true })
      .fill(E2E_REGISTER_REGULAR_USER.confirmPassword);

    await page.getByRole("button", { name: "Criar" }).click();

    const errorMessage = page.getByText(/Verifique suas credenciais./i);

    await expect(errorMessage).toBeVisible();
  });
});
