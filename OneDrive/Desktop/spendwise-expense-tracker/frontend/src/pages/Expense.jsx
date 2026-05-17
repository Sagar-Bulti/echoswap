import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Expense() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      await API.post("/expense", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Expense added successfully");

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Add Expense</h2>
        <p>Add your daily spending like food, travel, shopping, bills, or education.</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Example: Lunch"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Example: 120"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Example: Food"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Note</label>
            <input
              type="text"
              name="note"
              placeholder="Example: College canteen"
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default Expense;