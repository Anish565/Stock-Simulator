// APIS to fetch historical data, trending stock etc
const yahooFinance = require('yahoo-finance2').default;
const { logger } = require('../utils/logger'); // Import the logger
const { loadOrCreateConfig } = require('../utils/configReader'); // Import config reader 

const dbClient = require('../config/dbConfig'); 

async function fetchHistoricalDataFromYahoo() {

    try {
        // Load configuration (tickers, startDate, endDate) from appConfig.json
        const config = loadOrCreateConfig();
        const tickers = config.tickers;
        const { startDate, endDate } = config.historicalData;
        logger.info(`fetchHistoricalDataFromYahoo: tickers: ${tickers}, startDate: ${startDate}, endDate:${endDate}`);
        
        for (let ticker of tickers) {
            logger.info(`fetchHistoricalDataFromYahoo: Fetching data for ticker ${ticker} from startDate: ${startDate}, endDate:${endDate}`);
            const data = await yahooFinance.chart(ticker, {
                period1: new Date(startDate),
                period2: new Date(endDate),
                interval: '1d',
            });

               
            for (let day of data.quotes) {
                try {
                    // Code to insert data into db. See how to insert Batch insert or how. As for each day you cannot insert
                    logger.info(`fetchHistoricalDataFromYahoo: Ticker: ${ticker} Day:${day.high}`);
                } catch (dbError) {
                    logger.error(`fetchHistoricalDataFromYahoo: Error storing data for ${ticker} on ${day.date}: ${dbError.message}`);
                }
                
            }
        }

        
    } catch (error) {
        logger.error(`Error fetching historical data for ${ticker}:`, error);
    }

}

module.exports = { fetchHistoricalDataFromYahoo };