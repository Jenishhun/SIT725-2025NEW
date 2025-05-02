const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.showHome);
router.post('/add-expense', expenseController.handleNewExpense);

module.exports = router;
