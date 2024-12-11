const fetch = require('node-fetch');
const moment = require('moment');
const {polygonDynamoService} = require('../services/polygonDB');
const { log } = require('winston');

const NEWS_API_KEY = 'SkQhuuOAYl60JT9p4eVKSh36XlFQjxWP';

async function fetchNewsForTickers(limit = 10) {
    const today = moment().format('YYYY-MM-DD');
    const NEWS_API_URL = `https://api.polygon.io/v2/reference/news?&pulished_utc=${today}&order=desc&limit=${limit}&sort=published_utc&apiKey=${NEWS_API_KEY}`;
    try {
        logger.debug(`Fetching News from: ${NEWS_API_URL}`);
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            console.error(`Error fetching news`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        logger.error(`Error fetching news: ${error}`)
        console.error(`Error fetching news ${error}`);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function daemonFetchNewsForTickers(limit = 10) {
    logger.info("daemonFetchNewsForTickers: Fetching News for Tickers");
    const polygonArticles = await fetchNewsForTickers(limit);
    
    logger.info("daemonFetchNewsForTickers: Inserting into DynamoDB");
    polygonDynamoService(polygonArticles);

    logger.info("daemonFetchNewsForTickers: Sleeping for 1 hour before Fetching News again");
    await sleep(3600 * 1000);    
}


module.exports = {fetchNewsForTickers, daemonFetchNewsForTickers};
