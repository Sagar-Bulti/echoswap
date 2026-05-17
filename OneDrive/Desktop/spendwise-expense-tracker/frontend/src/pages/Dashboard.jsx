import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    recentIncomes: [],
    recentExpenses: [],
    expenseCategoryData: [],
  });

  const [budgetData, setBudgetData] = useState({
    budgetAmount: 0,
    totalExpense: 0,
    remainingBudget: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const dashboardRes = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const budgetRes = await API.get(`/budget?month=${currentMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(dashboardRes.data);
      setBudgetData(budgetRes.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <h2 className="loading-text">Loading dashboard...</h2>;
  }

  const chartData = [
    {
      name: "Income",
      value: dashboardData.totalIncome,
    },
    {
      name: "Expense",
      value: dashboardData.totalExpense,
    },
  ];

  const COLORS = ["#16a34a", "#dc2626"];
  const CATEGORY_COLORS = ["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#dc2626"];

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">Overview of your money</p>

      <div className="summary-cards">
        <div className="summary-card income-card">
          <h3>Total Income</h3>
          <p>₹{dashboardData.totalIncome}</p>
        </div>

        <div className="summary-card expense-card">
          <h3>Total Expense</h3>
          <p>₹{dashboardData.totalExpense}</p>
        </div>

        <div className="summary-card balance-card">
          <h3>Balance</h3>
          <p>₹{dashboardData.balance}</p>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card budget-card">
          <h3>Monthly Budget</h3>
          <p>₹{budgetData.budgetAmount}</p>
        </div>

        <div className="summary-card expense-card">
          <h3>This Month Expense</h3>
          <p>₹{budgetData.totalExpense}</p>
        </div>

        <div className="summary-card balance-card">
          <h3>Remaining Budget</h3>
          <p>₹{budgetData.remainingBudget}</p>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h2>Income vs Expense</h2>

          {dashboardData.totalIncome === 0 &&
          dashboardData.totalExpense === 0 ? (
            <p>No data available for chart</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <h2>Expense by Category</h2>

          {dashboardData.expenseCategoryData.length === 0 ? (
            <p>No expense category data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.expenseCategoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {dashboardData.expenseCategoryData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="recent-section">
        <div className="recent-card">
          <h2>Recent Incomes</h2>

          {dashboardData.recentIncomes.length === 0 ? (
            <p>No income records found</p>
          ) : (
            dashboardData.recentIncomes.map((income) => (
              <div className="recent-item" key={income._id}>
                <div>
                  <h4>{income.title}</h4>
                  <span>{income.category}</span>
                </div>
                <strong className="income-text">₹{income.amount}</strong>
              </div>
            ))
          )}
        </div>

        <div className="recent-card">
          <h2>Recent Expenses</h2>

          {dashboardData.recentExpenses.length === 0 ? (
            <p>No expense records found</p>
          ) : (
            dashboardData.recentExpenses.map((expense) => (
              <div className="recent-item" key={expense._id}>
                <div>
                  <h4>{expense.title}</h4>
                  <span>{expense.category}</span>
                </div>
                <strong className="expense-text">₹{expense.amount}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;