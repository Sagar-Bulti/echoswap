const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// Add or update monthly budget
const setBudget = async (req, res) => {
  try {
    const { amount, month } = req.body;

    if (!amount || !month) {
      return res.status(400).json({
        message: "Amount and month are required",
      });
    }

    let budget = await Budget.findOne({
      user: req.user._id,
      month,
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await Budget.create({
        user: req.user._id,
        amount,
        month,
      });
    }

    res.status(200).json({
      message: "Budget saved successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get budget summary
const getBudgetSummary = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        message: "Month is required",
      });
    }

    const budget = await Budget.findOne({
      user: req.user._id,
      month,
    });

    const expenses = await Expense.find({
      user: req.user._id,
    });

    const monthlyExpenses = expenses.filter((expense) => {
      const expenseMonth = new Date(expense.date).toISOString().slice(0, 7);
      return expenseMonth === month;
    });

    const totalExpense = monthlyExpenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const budgetAmount = budget ? budget.amount : 0;
    const remainingBudget = budgetAmount - totalExpense;

    res.status(200).json({
      month,
      budgetAmount,
      totalExpense,
      remainingBudget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  setBudget,
  getBudgetSummary,
};