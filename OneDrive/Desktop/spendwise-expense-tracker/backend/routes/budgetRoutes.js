const express = require("express");
const {
  setBudget,
  getBudgetSummary,
} = require("../controllers/budgetController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, setBudget);
router.get("/", protect, getBudgetSummary);

module.exports = router;