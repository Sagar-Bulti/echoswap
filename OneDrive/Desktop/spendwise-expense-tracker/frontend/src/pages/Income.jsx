import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Income() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
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

      await API.post("/income", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Income added successfully");

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add income");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Add Income</h2>
        <p>Add your salary, pocket money, freelance income, or other earnings.</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Example: Salary"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Example: 25000"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Example: Salary"
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

          <button type="submit" className="auth-btn">
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
}

export default Income;