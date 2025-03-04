import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!amount.trim()) {
      alert("Amount is required.");
      return;
    }

    addExpense({
      expense: expense || "Unknown",
      amount,
      date: date || new Date().toLocaleString(), // Default date if empty
    });

    setExpense("");
    setAmount("");
    setDate("");
  };

  return (
    <form className="add-expense" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <div className="input-group">
        <label>Expense Name</label>
        <input type="text" value={expense} onChange={(e) => setExpense(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Amount (INR)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>

      <div className="input-group">
        <label>Date & Time</label>
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
