import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from ".";

describe("Counter", () => {
  it("Should start count by 0", () => {
    render(<Counter />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("Should icrement count", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText("+"));
    expect(screen.getByText("1")).toBeInTheDocument();

    await user.click(screen.getByText("+"));
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
