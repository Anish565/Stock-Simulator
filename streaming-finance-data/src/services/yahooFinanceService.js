// APIS to fetch historical data, trending stock etc
const yahooFinance = require('yahoo-finance2').default;
const { logger } = require('../utils/logger'); // Import the logger
const { loadOrCreateConfig } = require('../utils/configReader'); // Import config reader 
//const { ensureTableExists, insertHistoricalData } = require('./dbServices');
const {loadToDynamo} = require('./dynamoService')
//const dbClient = require('../config/dbConfig'); 
const e = require('express');


function periodToInterval(period) {
    switch (period) {
        case '1D':
            return '1m';
        case '5D':
            return '30m';
        case '1M':
            return '1d';
        case '6M':
            return '1d';
        case '1Y':
            return '1d';
        case 'YTD':
            return '1d';
        case '5Y':
            return '1wk';
        default:
            throw new Error(`Unsupported period: ${period}`);
    }
}

function calculateStartDate(interval) {
    const end = new Date();
    const start = new Date(end); 

    if (interval.includes("YTD")) {
        start.setMonth(0); 
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
    }else if (interval.includes("D")) {
        const days = parseInt(interval);
        start.setDate(end.getDate() - days);
    } else if (interval.includes("M")) {
        const months = parseInt(interval);
        start.setMonth(end.getMonth() - months);
    } else if (interval.includes("Y")) {
        const years = parseInt(interval);
        start.setFullYear(end.getFullYear() - years);
    }else {
        throw new Error("Unsupported interval format");
    }

    return [start, end]; 
}

async function fetchHistoricalDataFromYahoo(period) {

    try {
        // Load configuration (tickers) from appConfig.json -> startDate, endDate not using from loadConfig.
        const config = loadOrCreateConfig();
        const tickers = config.tickers;
        const [startDate, endDate] = calculateStartDate(period)
        
        logger.info(`fetchHistoricalDataFromYahoo: Tickers available: ${tickers} from startDate: ${startDate}, endDate:${endDate}`);
        
        // const tickers = ["AAPL", "MSFT", "GOOGL"];
        
        for (const ticker of tickers) {
            console.log('Ticker:', ticker);
            logger.info(`fetchHistoricalDataFromYahoo: Fetching data for ticker ${ticker} from startDate: ${startDate}, endDate:${endDate}`);
            const historicalData = await yahooFinance.chart(ticker, {
                period1: startDate,
                period2: endDate,
                interval: periodToInterval(period),
            });
            
            // Insert historical data
            // console.log(historicalData);
            logger.info("fetchHistoricalDataFromYahoo: Inserting into Historical Data");
            await loadToDynamo(historicalData, period);

            // for (const day of historicalData.quotes) {
            //     try {
            //         dayDate = day.date
            //         dayHigh = day.high
            //         dayLow = day.low
            //         dayOpen = day.open
            //         dayClose = day.close
            //         dayVolume = day.volume

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

module.exports = { fetchHistoricalDataFromYahoo,calculateStartDate };