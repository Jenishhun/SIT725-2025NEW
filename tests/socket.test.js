const io = require('socket.io-client');

describe('Socket.IO Expense Tests', () => {
    let clientSocket;

    beforeAll((done) => {
        clientSocket = io('http://localhost:3000');
        clientSocket.on('connect', done);
    });

    afterAll(() => {
        clientSocket.close();
    });

    test('should receive new expense update', (done) => {
        const testExpense = { name: 'Test User', amount: 123 };

        clientSocket.emit('newExpense', testExpense);
        clientSocket.on('updateExpenseList', (data) => {
            expect(data).toEqual(testExpense);
            done();
        });
    });
});
