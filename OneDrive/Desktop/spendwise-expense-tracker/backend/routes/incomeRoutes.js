const express = require("express");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addIncome);
router.get("/", protect, getIncomes);
router.delete("/:id", protect, deleteIncome);

module.exports = router;