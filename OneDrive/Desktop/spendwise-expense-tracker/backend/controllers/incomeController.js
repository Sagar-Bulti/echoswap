const Income = require("../models/Income");

// Add income
const addIncome = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const income = await Income.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all income
const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete income
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await income.deleteOne();

    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  addIncome,
  getIncomes,
  deleteIncome,
};