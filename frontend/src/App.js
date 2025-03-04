import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import ExpenseForm from "./components/expenseform";
import ExpenseList from "./components/expenselist";
import "./index.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    const updatedExpenses = [{ id: Date.now(), ...newExpense }, ...expenses];
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <>
      {!showTracker ? (
        <LandingPage onStart={() => setShowTracker(true)} />
      ) : (
        <>
          <h1 className="title">Expensify</h1>

          <div className="layout">
            {/* Left Side - Expense Form */}
            <ExpenseForm addExpense={addExpense} />

            {/* Right Side - Expense List */}
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
