import { useEffect, useState } from "react";
import API from "../api/axios";

function Budget() {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [formData, setFormData] = useState({
    amount: "",
    month: currentMonth,
  });

  const [summary, setSummary] = useState({
    budgetAmount: 0,
    totalExpense: 0,
    remainingBudget: 0,
  });

  const [message, setMessage] = useState("");

  const fetchBudgetSummary = async (monthValue) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/budget?month=${monthValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudgetSummary(formData.month);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "month") {
      fetchBudgetSummary(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await API.post("/budget", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Budget saved successfully");
      fetchBudgetSummary(formData.month);
    } catch (error) {
      setMessage("Failed to save budget");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Monthly Budget</h2>
        <p>Set your monthly spending limit and track remaining budget.</p>

        {message && <div className="success-message">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Budget Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Example: 10000"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Month</label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Save Budget
          </button>
        </form>

        <div className="budget-summary">
          <h3>Budget Summary</h3>

          <div className="summary-row">
            <span>Budget Amount</span>
            <strong>₹{summary.budgetAmount}</strong>
          </div>

          <div className="summary-row">
            <span>Total Expense</span>
            <strong>₹{summary.totalExpense}</strong>
          </div>

          <div className="summary-row balance">
            <span>Remaining Budget</span>
            <strong>₹{summary.remainingBudget}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;