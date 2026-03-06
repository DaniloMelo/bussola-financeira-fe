/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import AuthLayout from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

describe("AuthLayout", () => {
  const defaultProps = {
    title: "Bem-vindo!",
    description: "Comece hoje",
    children: <p>Componente filho</p>,
  };

  it("Should render the title passing by props", () => {
    render(<AuthLayout {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Bem-vindo!" }),
    ).toBeInTheDocument();
  });

  it("Should render the description passing by props", () => {
    render(<AuthLayout {...defaultProps} />);
    expect(screen.getByText("Comece hoje")).toBeInTheDocument();
  });

  it("Should render the children component", () => {
    render(<AuthLayout {...defaultProps} />);
    expect(screen.getByText("Componente filho")).toBeInTheDocument();
  });

  it("Should render the side image", () => {
    render(<AuthLayout {...defaultProps} />);
    // TODO: Trocar "Imagem decorativa" depois de trocar para uma imagem real no componente AuthLayout
    expect(screen.getByAltText("Imagem decorativa")).toBeInTheDocument();
  });

  it("Should render side image text", () => {
    render(<AuthLayout {...defaultProps} />);
    expect(screen.getByText("Controle suas finanças")).toBeInTheDocument();
  });
});
