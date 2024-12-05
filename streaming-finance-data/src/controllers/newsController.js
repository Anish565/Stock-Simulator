const { fetchNews } = require('../services/newsService');
const { logger } = require('../utils/logger');


// "http://localhost:3000/api/news?q=finance&pageSize=10"
async function getNews(req, res) {
    try {
        const query = req.query.company || 'finance';
        //const query = req.query.q || 'finance';
        const pageSize = req.query.pageSize || 10;

        logger.info(`getNews: Received request for news with query ${query}`);
        const articles = await fetchNews(query, pageSize);

        logger.info(`getNews: Fetched News ${JSON.stringify(articles, null, 2)}`);

        res.status(200).json({ articles });
    } catch (error) {
        logger.error(`getNews: Error fetching news - ${error.message}`);
        res.status(500).json({ error: `Failed to fetch news: ${error.message}` });
    }

}

module.exports = {getNews}