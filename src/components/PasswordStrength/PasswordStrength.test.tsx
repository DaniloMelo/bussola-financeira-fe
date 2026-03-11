import { render, screen } from "@testing-library/react";
import PasswordStrength from ".";

describe("PasswordStrength", () => {
  it("Should show 'week' password strength correctly", () => {
    render(<PasswordStrength password="123456" />);
    expect(screen.getByText("Força da senha:")).toBeInTheDocument();
    expect(screen.getByText("Fraca")).toBeInTheDocument();
  });

  it("Should show 'nomal' password strength correctly", () => {
    render(<PasswordStrength password="Password123" />);
    expect(screen.getByText("Força da senha:")).toBeInTheDocument();
    expect(screen.getByText("Média")).toBeInTheDocument();
  });

  it("Should show 'strong' password strength correctly", () => {
    render(<PasswordStrength password="P@ssword!123" />);
    expect(screen.getByText("Força da senha:")).toBeInTheDocument();
    expect(screen.getByText("Forte")).toBeInTheDocument();
  });
});
