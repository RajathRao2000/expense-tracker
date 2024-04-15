import { render, screen } from "@testing-library/react";
import ExpenseTracker from "./ExpenseTracker";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

describe("testing expense tracker component", () => {
  test("Login Title", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const loginTitle = screen.getByText("Enter your Expense");
    expect(loginTitle).toBeInTheDocument();
  });

  test("Table Title", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const tableTitle = screen.getByText("Expenses List");
    expect(tableTitle).toBeInTheDocument();
  });

  test("Download Button", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const downloadBtn = screen.getByText("Download Now");
    expect(downloadBtn).toBeInTheDocument();
  });

  test("Add Expense Button", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const addExpBtn = screen.getByText("Add Expense");
    expect(addExpBtn).toBeInTheDocument();
  });

  test("Download Button", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const downloadBtn = screen.getByText("Download Now");
    expect(downloadBtn).toBeInTheDocument();
  });

  test("Money spent input", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const moneySpent = screen.getByPlaceholderText("Money spent");
    expect(moneySpent).toBeInTheDocument();
  });

  test("Description", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const desc = screen.getByPlaceholderText("Description");
    expect(desc).toBeInTheDocument();
  });

  test("category", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const category = screen.getByText("Category");
    expect(category).toBeInTheDocument();
  });

  test("table-category", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const desc = screen.getByText("Category");
    expect(desc).toBeInTheDocument();
  });

  test("table Edit-delete", () => {
    render(<MemoryRouter><Provider store={store}><ExpenseTracker /></Provider></MemoryRouter>);
    const Edit_delete = screen.getByText("Edit / Delete");
    expect(Edit_delete).toBeInTheDocument();
  });

});
