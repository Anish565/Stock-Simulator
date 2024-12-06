const  pool  = require("../config/dbConfig")
const { logger } = require('../utils/logger');
const {
    historicalStockTable,
    insertHistoricalDataQuery,
} = require('../models/dataModel');
const {loadToDynamo} = require('./dynamoService')


// Ensure table exists
async function ensureTableExists() {
    try {
        logger.info(`ensureTableExists: pool object: ${pool}`);
        await pool.query(historicalStockTable);
        logger.info('ensureTableExists: Table "historical_stock_data" is ready.');
    } catch (error) {
        logger.error(`ensureTableExists: Error ensuring table exists: ${error.message}`);
        //throw error;
    }
}


// Insert historical data
async function insertHistoricalData(ticker, historicalData) {
    try {
        for (const day of historicalData.quotes) {
            dayDate = day.date;
            dayHigh = day.high;
            dayLow = day.low;
            dayOpen = day.open;
            dayClose = day.close;
            dayVolume = day.Volume;
            
            logger.info(`insertHistoricalData: Ticker: ${ticker} dayDate: ${dayDate}, dayHigh: ${dayHigh}, dayLow: ${dayLow}, dayHigh: ${dayOpen}, dayHigh: ${dayOpen}, dayClose: ${dayClose}, dayVolume: ${dayVolume}`);
            const values = [
                ticker,
                day.date,
                day.open,
                day.high,
                day.low,
                day.close,
            ];
            
            logger.info(`insertHistoricalData: Inserting historical data ${values}`);
            await pool.query(insertHistoricalDataQuery, values);
            // await loadToDynamo(historicalData);
            logger.info(`insertHistoricalData: Inserted data for ${ticker} on ${day.date}`);
        }
    } catch (error) {
        logger.error(`insertHistoricalData: Error inserting data for ${ticker}: ${error.message}`);
        throw error;
    }
}

module.exports = { ensureTableExists, insertHistoricalData };
