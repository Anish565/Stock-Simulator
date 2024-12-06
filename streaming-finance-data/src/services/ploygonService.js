const fetch = require('node-fetch');
const moment = require('moment');


const NEWS_API_KEY = 'SkQhuuOAYl60JT9p4eVKSh36XlFQjxWP';

async function fetchNewsForTickers(limit = 10) {
    const today = moment().format('YYYY-MM-DD');
    const NEWS_API_URL = `https://api.polygon.io/v2/reference/news?&pulished_utc=${today}&order=desc&limit=${limit}&sort=published_utc&apiKey=${NEWS_API_KEY}`;
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            console.error(`Error fetching news`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching news`);
    }
}
module.exports = {fetchNewsForTickers};
