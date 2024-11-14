//Controller for trending stocks API

const yahooFinance = require('yahoo-finance2').default

async function getTrendingStocks(req, res) {
    try {
        //logger.info(`getTrendingStocks: Received request ${JSON.stringify(req)}`);
        const trendingData = await yahooFinance.trendingSymbols('US');
        logger.info(`getTrendingStocks: Successfully fetched trending stocks data ${trendingData}`);
        res.json(trendingData);
    } catch (error) {
        logger.error(`getTrendingStocks: Error fetching trending stocks - ${error.message}`);
        res.status(500).json({ error: `Failed to fetch trending stocks. ${error.message}`});
    }
    
}

module.exports = { getTrendingStocks };