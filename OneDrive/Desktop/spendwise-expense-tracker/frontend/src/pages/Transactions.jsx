import { useEffect, useState } from "react";
import API from "../api/axios";

function Transactions() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const incomeRes = await API.get("/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const expenseRes = await API.get("/expense", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    const confirmDelete = window.confirm("Delete this income?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/income/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm("Delete this expense?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return <h2 className="loading-text">Loading transactions...</h2>;
  }

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <p className="dashboard-subtitle">View all your income and expense records</p>

      <div className="transaction-section">
        <div className="transaction-card">
          <h2>All Incomes</h2>

          {incomes.length === 0 ? (
            <p>No income records found</p>
          ) : (
            incomes.map((income) => (
              <div className="transaction-item" key={income._id}>
                <div>
                  <h4>{income.title}</h4>
                  <span>
                    {income.category} •{" "}
                    {new Date(income.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="transaction-actions">
                  <strong className="income-text">+ ₹{income.amount}</strong>
                  <button
                    className="delete-btn"
                    onClick={() => deleteIncome(income._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="transaction-card">
          <h2>All Expenses</h2>

          {expenses.length === 0 ? (
            <p>No expense records found</p>
          ) : (
            expenses.map((expense) => (
              <div className="transaction-item" key={expense._id}>
                <div>
                  <h4>{expense.title}</h4>
                  <span>
                    {expense.category} •{" "}
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="transaction-actions">
                  <strong className="expense-text">- ₹{expense.amount}</strong>
                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;