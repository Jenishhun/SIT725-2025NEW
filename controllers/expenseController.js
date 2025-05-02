const Expense = require('../models/expense');

async function showHome(req, res) {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.render('index', { expenses });
}

async function handleNewExpense(req, res) {
    const { name, amount } = req.body;
    await Expense.create({ name, amount });
    res.redirect('/');
}

module.exports = { showHome, handleNewExpense };
