const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomes = await Income.find({ user: userId });
    const expenses = await Expense.find({ user: userId });

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpense;

    const recentIncomes = await Income.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpenses = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    const expenseByCategory = {};

    expenses.forEach((expense) => {
      if (expenseByCategory[expense.category]) {
        expenseByCategory[expense.category] += expense.amount;
      } else {
        expenseByCategory[expense.category] = expense.amount;
      }
    });

    const expenseCategoryData = Object.keys(expenseByCategory).map(
      (category) => ({
        name: category,
        value: expenseByCategory[category],
      })
    );

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      recentIncomes,
      recentExpenses,
      expenseCategoryData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getDashboardData };