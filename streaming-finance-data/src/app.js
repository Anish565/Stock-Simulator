const express = require('express');
const { fetchHistoricalDataFromYahoo } = require('./services/yahooFinanceService');
const { streamFinanceData } = require('./services/websocketService');
const { fetchHistoricalData } = require('./controllers/dataController');
const { getTrendingStocks } = require('./controllers/trendingController');
const { getNews } = require('./controllers/newsController');
const { initializeLogger, logger } = require('./utils/logger');


const app = express();
const port = require('./config/serverConfig').port;

// Initialize Logger
initializeLogger()

// Global Error Handlers
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    logger.error(err.stack);
    console.error(`Uncaught Exception: ${err.stack}`);
    process.exit(1); // Exit on critical error
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    console.error(`Unhandled Rejection: ${reason}`);
    process.exit(1); // Exit on critical error
});

// Routes
//app.get('/api/fetched-data', fetchHistoricalData);  // Fetch historical data API
app.get('/api/news', getNews); // GetNews
app.get('/api/trending-stocks', getTrendingStocks); // Trending stocks API
app.use(express.json());


try {
    // Start server
    app.listen(port, () => {
        logger.info(`Server running on http://localhost:${port}`);
        console.log(`Server running on http://localhost:${port}`);
    });
} catch (error) {
    logger.error(`Error while starting server: ${error}`);
    console.log(`Error while starting server: ${error}`);
}

// Initialize Background Services
async function startApp() {
    try {
        
        await fetchHistoricalDataFromYahoo(); // Run historical data fetch once at startup
        streamFinanceData(); // Start real-time data streaming (runs continuously)
    } catch (error) {
        logger.error(`Error initializing application services: ${error.message}`);
        process.exit(1); // Exit the application if initialization fails
    }
}

// Start background services after server starts
try {
    logger.info(`Launching startApp`);
    console.log(`Launching startApp`);
    startApp()
} catch (error) {
    logger.error(`app.js: Failed to start application: ${error.message}`);
    console.log(`app.js: Failed to start application: ${error.message}`);
}

module.exports = app;
