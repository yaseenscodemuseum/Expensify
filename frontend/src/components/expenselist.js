import React, { useState } from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  // Sorting Function
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.expense.localeCompare(b.expense)
        : b.expense.localeCompare(a.expense);
    } else if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });

  // Calculate total amount
  const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      {/* Sorting Dropdown with Arrow */}
      <div className="sort-container">
        <label>Sort by:</label>
        <div className="sort-dropdown">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
          <span className="sort-arrow" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "▼" : "▲"}
          </span>
        </div>
      </div>

      {/* Expense Table */}
      <div className="expense-list-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.expense}</td>
                <td>{exp.amount}</td>
                <td>{exp.date}</td>
                <td>
                  <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Expense Container */}
      <div className="total-container">
        <h3>Total Expense: ₹{totalAmount}</h3>
      </div>
    </div>
  );
};

export default ExpenseList;