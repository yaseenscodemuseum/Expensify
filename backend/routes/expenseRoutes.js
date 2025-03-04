const express = require("express");
const Expense = require("../models/Expense");  // ✅ Correct path


const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

// Add an expense
router.post("/", async (req, res) => {
    const { title, amount, category } = req.body;
    const newExpense = new Expense({ title, amount, category });
    await newExpense.save();
    res.json(newExpense);
});

// Delete an expense
router.delete("/:id", async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense Deleted" });
});

module.exports = router;
