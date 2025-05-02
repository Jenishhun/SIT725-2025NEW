document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const expenseList = document.getElementById('expenseList');

    socket.on('updateExpenseList', (data) => {
        const li = document.createElement('li');
        li.textContent = `${data.name}: $${data.amount}`;
        expenseList.appendChild(li);
    });
});
