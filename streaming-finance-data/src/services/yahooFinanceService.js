// APIS to fetch historical data, trending stock etc
const yahooFinance = require('yahoo-finance2').default;
const { logger } = require('../utils/logger'); // Import the logger
const { loadOrCreateConfig } = require('../utils/configReader'); // Import config reader 
const { ensureTableExists, insertHistoricalData } = require('./dbServices');
const {loadToDynamo} = require('./dynamoService')
const dbClient = require('../config/dbConfig'); 

async function fetchHistoricalDataFromYahoo() {

    try {
        // console.log(dbClient, "here 7");
        // Load configuration (tickers, startDate, endDate) from appConfig.json
        const config = loadOrCreateConfig();
        const tickers = config.tickers;
        const { startDate, endDate } = config.historicalData;
        
        logger.info(`fetchHistoricalDataFromYahoo: tickers: ${tickers}, startDate: ${startDate}, endDate:${endDate}`);
        
        // Ensure the table exists
        logger.info("fetchHistoricalDataFromYahoo: Checking if the table historical_stock_data exists");
        
        await ensureTableExists();
        logger.info("fetchHistoricalDataFromYahoo: historical_stock_data exists");

        for (let ticker of tickers) {
            logger.info(`fetchHistoricalDataFromYahoo: Fetching data for ticker ${ticker} from startDate: ${startDate}, endDate:${endDate}`);
            const historicalData = await yahooFinance.chart(ticker, {
                period1: new Date(startDate),
                period2: new Date(endDate),
                interval: '1d',
            });
            
            // Insert historical data
            logger.info("fetchHistoricalDataFromYahoo: Inserting into Historical Data");
            await loadToDynamo(historicalData);

            // for (const day of historicalData.quotes) {
            //     try {
            //         dayDate = day.date
            //         dayHigh = day.high
            //         dayLow = day.low
            //         dayOpen = day.open
            //         dayClose = day.close
            //         dayVolume = day.Volume

            //         // Code to insert data into db. See how to insert Batch insert or how. As for each day you cannot insert
            //         logger.info(`fetchHistoricalDataFromYahoo: Ticker: ${ticker} dayDate: ${dayDate}, dayHigh: ${dayHigh}, dayLow: ${dayLow}, dayHigh: ${dayOpen}, dayHigh: ${dayOpen}, dayClose: ${dayClose}, dayVolume: ${dayVolume}`);
            //     } catch (dbError) {
            //         logger.error(`fetchHistoricalDataFromYahoo: Error storing data for ${ticker} on ${day.date}: ${dbError.message}`);
            //     }
                
            // }
        }

        
    } catch (error) {
        console.log(error)
        logger.error(`Error fetching historical data for ${ticker}:`, error);
    }

}

module.exports = { fetchHistoricalDataFromYahoo };