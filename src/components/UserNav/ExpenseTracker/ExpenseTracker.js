import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {useDispatch,useSelector} from "react-redux"
import { CSVLink } from "react-csv";

import "./ExpenseTracker.css";
import keys from "../../../keys";
import { useHistory } from "react-router";
import { Button, ButtonGroup } from "react-bootstrap";
import { expenseActions } from "../../store/exp";

function ExpenseTracker() {
  const history = useHistory();
  const dispatch=useDispatch()

  // const [expensesList, setExpnesesList] = useState([]);
  const expensesList=useSelector(state=>state.expense.list)
  const [isEditMode, setIsEditMode] = useState("");
  const dark=useSelector(state=>state.theme.dark)

  const [expense, setExpense] = useState();
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState();
  let email;
  try {
    email = JSON.parse(localStorage.getItem("token")).email;
    email = email.replace(/[.@]/g, "");
  } catch (error) {
    console.log(error);
    alert("login details not found. Please login to add expense...");
    history.replace("/login");
  }

  const AddExpense = async (e, edit) => {
    e.preventDefault();
    let expense = e.target[0].value;
    let description = e.target[1].value;
    let category = e.target[2].value;
    if (!expense) {
      alert("Enter valid expense");
      return;
    } else if (!description) {
      alert("Enter valid description");
      return;
    } else if (category == "Choose Category") {
      alert("choose a valid category from the list");
      return;
    }

    const temp = {
      expense,
      description,
      category,
    };
    console.log(temp);
    if (isEditMode) {
      try {
        console.log(
          `${keys.firebaseUrl}/expenses-list/${email}/${isEditMode}.json`
        );
        const res = await axios.patch(
          `${keys.firebaseUrl}/expenses-list/${email}/${isEditMode}.json`,
          {
            expense,
            description,
            category,
          }
        );
        console.log("successful edit", res, res.data);
        getExpense();
      } catch (error) {
        console.log("error in edit", error);
      }
      setIsEditMode(false);
      return;
    }
    try {
      const res = await axios.post(
        `${keys.firebaseUrl}/expenses-list/${email}.json`,
        temp
      );
      console.log("Added successfully", res.data);
    } catch (error) {
      console.log("error in adding", error);
    }
    dispatch(expenseActions.addExpense(temp))
    // setExpnesesList((prev) => [...prev, temp]);
  };

  const getExpense = async () => {
    try {
      const res = await axios.get(
        `${keys.firebaseUrl}/expenses-list/${email}.json`
      );
      console.log("successfully received expenses list", res.data);

      dispatch(expenseActions.setExpenses(Object.keys(res.data).map((expenseid) => {
        return { ...res.data[expenseid], expenseid };
      })))
    } catch (error) {
      console.log("error in fetching expense list or expense list is empty");
    }
  };
  useEffect(() => {
    getExpense();
  }, []);

  const updateInput = (e, type) => {
    console.log(e.target.value, type);
    switch (type) {
      case "expense":
        setExpense(e.target.value);
        break;
      case "desc":
        setDesc(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
    }
  };

  const handleEdit = (e, edit) => {
    console.log("edit", edit);
    setIsEditMode(true);
    setExpense(edit.expense);
    setCategory(edit.category);
    setDesc(edit.description);
    setIsEditMode(edit.expenseid);
  };

  const handleDelete = async (expenseid) => {
    try {
      const res = await axios.delete(
        `${keys.firebaseUrl}/expenses-list/${email}/${expenseid}.json`
      );
      console.log("successfully deleted",res, res.data);
      dispatch(expenseActions.deleteExpense(expenseid))
    } catch (error) {
      console.log("error in deletion", error);
    }
  };

  return (
    <section className={`expense-tracker ${dark?"bg-gray-400":""}`}>
      <form className={`form expense-form ${dark?"bg-black text-white":""}`} onSubmit={AddExpense}>
        <h1>Enter your Expense</h1>
        <input
          name="money-spent"
          placeholder="Money spent"
          type="number"
          value={expense}
          onChange={(e) => updateInput(e, "expense")}
          className={`${dark?"text-black":""}`}
        />
        <input
          name="description"
          placeholder="Description"
          value={desc}
          onChange={(e) => updateInput(e, "desc")}
          className={`${dark?"text-black":""}`}
        />
        <select
          name="categories"
          value={category}
          onChange={(e) => updateInput(e, "category")}
          className={`${dark?"text-black":""}`}
        >
          <option value="Choose Category">Choose Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Drinks">Drinks</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <button className="form-btn" type="submit">
          {isEditMode ? "Edit Expense" : "Add Expense"}
        </button>
      </form>
      <section className={`expenses-table flex flex-col ${dark?"bg-black text-white":""}`}>
        <h2>Expenses List</h2>
        {(!!expensesList && expensesList.reduce((total,current)=>{
          return total+Number(current.expense)
        },0)>10000) && <button className="rounded p-3 m-3 bg-red-400 w-96 align-self-center text-white">Activate Premium</button>}


        {!!expensesList ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Money Spent</th>
                <th>Description</th>
                <th>Category</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {expensesList&&expensesList.map((expense, i) => {
                // setExpenseTotal((p)=>p+expense.expense)
                // console.log(expense);
                return (
                  <tr key={expense.expenseid}>
                    <td>{i + 1}</td>
                    <td>{expense.expense}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          onClick={(e) => handleEdit(e, expense)}
                          style={{ backgroundColor: "transparent" }}
                          variant="warning"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#ffc107"
                              d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"
                            ></path>
                          </svg>
                        </Button>
                        <Button
                          onClick={() => handleDelete(expense.expenseid)}
                          variant="danger"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="red"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                            ></path>
                          </svg>
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>your added expenses will be shown here...</p>
        )}
        <CSVLink filename={new Date()} className={`p-3 w-80 align-self-center text-center no-underline bg-green-500 text-white rounded`} data={expensesList?expensesList.map((expense)=>{
          return {
            expense: expense.expense,
            description: expense.description,
            category: expense.category
          }
        }):[]}>Download Now</CSVLink>
      </section>
    </section>
  );
}

export default ExpenseTracker;
