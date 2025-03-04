import React, { useState } from "react";
import "./index.css"; // Ensure the CSS is correctly imported

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addExpense = () => {
    if (!expense.trim() || isNaN(amount) || amount <= 0 || !category.trim()) {
      alert("Please enter a valid expense, amount, and category.");
      return;
    }

    const newExpense = { id: Date.now(), expense, amount, category };
    setExpenses([...expenses, newExpense]);
    setExpense("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="container">
      {/* Left Side - Add Expense */}
      <div className="add-expense">
        <h2>Add Expense</h2>

        <div className="input-group">
          <label>Expense Name</label>
          <input
            type="text"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* Right Side - Expense List */}
      <div className="expense-list">
        <h2>Expense List</h2>
        {expenses.length > 0 ? (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.expense}</td>
                  <td>₹{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>
                    <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
