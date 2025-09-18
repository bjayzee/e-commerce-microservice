const app = require('./app');
const connectDB = require('./config/server');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
        console.log(`Order Service running on port ${PORT}`);
        }).on('error', (err) => {
        console.error('Server startup error:', err.message);
        process.exit(1);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
};

startServer();
