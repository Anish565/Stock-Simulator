const express = require('express');
const { fetchHistoricalDataFromYahoo } = require('./services/yahooFinanceService');
const { streamFinanceData } = require('./services/websocketService');
const { fetchHistoricalData } = require('./controllers/dataController');
const { getTrendingStocks } = require('./controllers/trendingController');
const { initializeLogger, logger } = require('./utils/logger');


const app = express();
const port = require('./config/serverConfig').port;

// Initialize Logger
initializeLogger()

// Routes
//app.get('/api/fetched-data', fetchHistoricalData);  // Fetch historical data API
app.get('/api/trending-stocks', getTrendingStocks); // Trending stocks API
app.use(express.json());

// Start server
app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
    console.log(`Server running on http://localhost:${port}`);
});

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
startApp().catch((error) => {
    logger.error(`Failed to start application: ${error.message}`);
});


module.exports = app;
