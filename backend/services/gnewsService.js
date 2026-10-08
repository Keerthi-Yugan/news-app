const axios = require("axios");

const GNEWS_API_URL = "https://gnews.io/api/v4";

const cache = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getTopHeadlines = async (category = "general") => {
    const now = Date.now();

    // Return cached data if available
    if (
        cache[category] &&
        now - cache[category].timestamp < CACHE_DURATION
    ) {
        console.log(`Using cached GNews: ${category}`);

        return cache[category].data;
    }

    const response = await axios.get(
        `${GNEWS_API_URL}/top-headlines`,
        {
            params: {
                category,
                lang: "en",
                country: "in",
                max: 10,
                apikey: process.env.GNEWS_API_KEY,
            },
        }
    );

    const articles = response.data.articles;

    // Save response in cache
    cache[category] = {
        data: articles,
        timestamp: now,
    };

    console.log(`Fetched fresh GNews: ${category}`);

    return articles;
};

module.exports = {
    getTopHeadlines,
};