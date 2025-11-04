import { fireEvent, render, screen } from "@testing-library/react";
import ButtonTemp from ".";

describe("ButtonTemp", () => {
  it("Should render with right text", () => {
    render(
      <ButtonTemp onClick={() => {}} variant="primary">
        Clique aqui
      </ButtonTemp>,
    );

    expect(screen.getByText("Clique aqui")).toBeInTheDocument();
  });

  it("Should call onclick event when clicked", () => {
    const handleClick = jest.fn();
    render(
      <ButtonTemp onClick={handleClick} variant="primary">
        Clique aqui
      </ButtonTemp>,
    );

    fireEvent.click(screen.getByText("Clique aqui"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Should don't call onClick event when disabled", () => {
    const handleClick = jest.fn();
    render(
      <ButtonTemp onClick={handleClick} variant="primary" disabled>
        Clique aqui
      </ButtonTemp>,
    );

    fireEvent.click(screen.getByText("Clique aqui"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("Should render correct button variant", () => {
    const { rerender } = render(
      <ButtonTemp onClick={() => {}} variant="primary">
        Primary
      </ButtonTemp>,
    );
    expect(screen.getByText("Primary")).toHaveClass("bg-blue-800");

    rerender(
      <ButtonTemp onClick={() => {}} variant="secondary">
        Secondary
      </ButtonTemp>,
    );
    expect(screen.getByText("Secondary")).toHaveClass("bg-zinc-600");
  });
});
