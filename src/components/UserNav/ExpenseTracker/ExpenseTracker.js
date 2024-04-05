import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import "./ExpenseTracker.css";
import keys from "../../../keys";
import { useHistory } from "react-router";

function ExpenseTracker() {
  const enteredexpense = useRef();
  const enteredDesc = useRef();
  const selectedCategory = useRef();
  const history=useHistory()

  const [expensesList, setExpnesesList] = useState([]);
  let email
  try{
    email=JSON.parse(localStorage.getItem("token")).email
    email=email.replace(/[.@]/g, "")
  }catch(error){
    console.log(error)
    alert("login details not found. Please login to add expense...")
    history.replace("/login")
  }

  const AddExpense = async (e) => {
    e.preventDefault();
    let expense = enteredexpense.current.value;
    let description = enteredDesc.current.value;
    let category = selectedCategory.current.value;
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
    try {
      const res = await axios.post(
        `${keys.firebaseUrl}/expenses-list/${email}.json`,
        temp
      );
      console.log("Added successfully", res.data);
    } catch (error) {
      console.log("error in adding", error);
    }
    setExpnesesList((prev) => [...prev, temp]);
  };

  const getExpense = async () => {
    try {
      const res = await axios.get(`${keys.firebaseUrl}/expenses-list/${email}.json`);
      console.log("successfully received expenses list", res.data);
      setExpnesesList(
        Object.keys(res.data).map((expenseid) => {
          return { ...res.data[expenseid], expenseid };
        })
      );
    } catch (error) {
      console.log("error in fetching expense list or expense list is empty");
    }
  };
  useEffect(() => {
    getExpense();
  }, []);

  return (
    <section className="expense-tracker">
      <form className="form expense-form" onSubmit={AddExpense}>
        <h1>Enter your Expense</h1>
        <input
          name="money-spent"
          placeholder="Money spent"
          type="number"
          ref={enteredexpense}
        />
        <input name="description" placeholder="Description" ref={enteredDesc} />
        <select name="categories" ref={selectedCategory}>
          <option value="Choose Category">Choose Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Drinks">Drinks</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <button className="form-btn" type="submit">
          Add Expense
        </button>
      </form>
      <section className="expenses-table">
        <h2>Expenses List</h2>
        {expensesList.length !== 0 ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Money Spent</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {expensesList.map((expense, i) => {
                console.log(expense);
                return (
                  <tr key={expense.expenseid}>
                    <td>{i + 1}</td>
                    <td>{expense.expense}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </Table>
        ) : (
          <p>your added expenses will be shown here...</p>
        )}
      </section>
    </section>
  );
}

export default ExpenseTracker;
