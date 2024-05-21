import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

import Header from "../../UI/Header/Header";
import LoginForm from "./LoginForm";

describe("testing Header component", () => {
  test("Header Title", () => {
    render(<LoginForm />);
    const headerTitle = screen.getByText("Welcome to Expense tracker!!!");
    expect(headerTitle).toBeInTheDocument();
  });

  test("change theme button light", () => {
    //Arrange
    render(<LoginForm />);

    //Act
    const buttonElement = screen.getAllByRole("button");
    userEvent.click(buttonElement);

    //Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });
});
