const Expense = require("../models/Expense");

// Add expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
};