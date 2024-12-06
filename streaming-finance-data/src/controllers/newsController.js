const { fetchNews } = require('../services/newsService');
const {fetchNewsForTickers} = require('../services/ploygonService');
const { logger } = require('../utils/logger');
const {polygonDynamoService} = require('../services/polygonDB')


// "http://localhost:3000/api/news?company=finance&pageSize=10"
async function getNews(req, res) {
    try {
        const query = req.query.company || 'finance';
        //const query = req.query.q || 'finance';
        const pageSize = req.query.pageSize || 10;

        logger.info(`getNews: Received request for news with query ${query}`);
        const articles = await fetchNews(query, pageSize);

        logger.info(`getNews: Fetched News ${JSON.stringify(articles, null, 2)}`);
        console.log(polygonArticles);

        res.status(200).json({ articles });
    } catch (error) {
        logger.error(`getNews: Error fetching news - ${error.message}`);
        res.status(500).json({ error: `Failed to fetch news: ${error.message}` });
    }

}

// "http://localhost:3000/api/polygon/news?limit=10"
async function getNews2pretty(req, res) {
    try {
        // const ticker = req.query.ticker;
        //const query = req.query.q || 'finance';
        const limit = req.query.limit || 10;
        const polygonArticles = await fetchNewsForTickers(limit);
        polygonDynamoService(polygonArticles);
        res.status(200).json({ polygonArticles });
    } catch (error) {
        logger.error(`getNews: Error fetching news - ${error.message}`);
        res.status(500).json({ error: `Failed to fetch news: ${error.message}` });
    }

}
module.exports = {getNews, getNews2pretty}