require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http').createServer(express());
const io = require('socket.io')(http);

const app = express();
const expenseRoutes = require('./routes/expenseRoutes');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', expenseRoutes);

io.on('connection', (socket) => {
    console.log('✅ Socket connected');

    socket.on('newExpense', (data) => {
        io.emit('updateExpenseList', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
