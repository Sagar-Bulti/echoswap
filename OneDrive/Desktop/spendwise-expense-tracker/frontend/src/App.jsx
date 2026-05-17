import Income from "./pages/Income";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expense from "./pages/Expense";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
         path="/income"
         element={
         <ProtectedRoute>
          <Income />
          </ProtectedRoute>
         }
        />
        <Route
          path="/expense"
          element={
          <ProtectedRoute>
          <Expense />
          </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
          <ProtectedRoute>
          <Transactions />
          </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
          <ProtectedRoute>
          <Budget />
          </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;