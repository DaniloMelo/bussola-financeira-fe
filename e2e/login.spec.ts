import { test, expect } from "@playwright/test";

const E2E_REGULAR_USER = {
  email: "testuser2e2fe@email.com",
  passoword: "StrongPass@123",
};

test.describe("Login", () => {
  test("Should login and redirect to '/dashboard'", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill(E2E_REGULAR_USER.email);
    await page
      .getByRole("textbox", { name: "Senha", exact: true })
      .fill(E2E_REGULAR_USER.passoword);

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test("Should show generic error if invalid or unexistent", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("textbox", { name: "Email", exact: true })
      .fill("wrong-or-unexistent@email.com");
    await page
      .getByRole("textbox", { name: "Senha", exact: true })
      .fill("wrong-or-unexistent");

    await page.getByRole("button", { name: /entrar/i }).click();

    const errorMessage = page.getByText(
      /Falha ao fazer login. Verifique suas credenciais./i,
    );

    await expect(errorMessage).toBeVisible();
  });
});
