const axios = require('axios');
const { logger } = require('../utils/logger');

const NEWS_API_KEY = '894f3a46fcbd461ea18ffe188f90b801';
const NEWS_API_URL = 'https://newsapi.org/v2';

async function fetchNews(query = 'finance', pageSize = 10) {
    try {
        const response = await axios.get(`${NEWS_API_URL}/everything`, {
            params: {
                apiKey: NEWS_API_KEY,
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize,
            },
        });
        logger.info(`fetchNews: Successfully fetched news for query "${query}"`);
        return response.data.articles;
    } catch (error) {
        logger.error(`fetchNews: Error fetching news - ${error.message}`);
        throw new Error('Failed to fetch news articles');
    }   
}

module.exports = { fetchNews };