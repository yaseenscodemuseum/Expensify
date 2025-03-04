import React, { useState } from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  const [sortByName, setSortByName] = useState(false);

  // Sorting by Name
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortByName) {
      return a.expense.localeCompare(b.expense);
    }
    return 0; // Default order (latest first)
  });

  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      {/* Sorting Button */}
      <div className="sort-container">
        <button onClick={() => setSortByName(!sortByName)}>
          Sort by Name {sortByName ? "↓" : "↑"}
        </button>
      </div>

      {/* Table Container (Scrollable) */}
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
    </div>
  );
};

export default ExpenseList;
