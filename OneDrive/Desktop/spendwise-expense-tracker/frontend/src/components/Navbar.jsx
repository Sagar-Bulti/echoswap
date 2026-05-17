import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkToken);
    window.addEventListener("tokenChanged", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("tokenChanged", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("tokenChanged"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        SpendWise
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/income">Add Income</Link>
            <Link to="/expense">Add Expense</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;