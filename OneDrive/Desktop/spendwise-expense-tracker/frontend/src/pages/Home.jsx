import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Track Your Money Smartly</h1>
          <p>
            SpendWise helps you manage income, expenses, and savings in one
            simple dashboard.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="btn secondary-btn">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>Monthly Summary</h3>

          <div className="summary-row">
            <span>Total Income</span>
            <strong>₹25,000</strong>
          </div>

          <div className="summary-row">
            <span>Total Expense</span>
            <strong>₹12,500</strong>
          </div>

          <div className="summary-row balance">
            <span>Balance</span>
            <strong>₹12,500</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;