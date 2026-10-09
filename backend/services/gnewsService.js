const axios = require("axios");

const GNEWS_API_URL = "https://gnews.io/api/v4";

const cache = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getGTopHeadlines = async (category = "general") => {
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
                max: 100,
                apikey: process.env.GNEWS_API_KEY,
            },
        }
    );

    

    const articles = response.data.articles;
    
    console.log(`Fetched GNews`, articles);

    // Save response in cache
    cache[category] = {
        data: articles,
        timestamp: now,
    };

    console.log(`Fetched fresh GNews: ${category}`);

    return articles;
};


const getGLatestNews = async (category = "general") => {
    const articles = await getGTopHeadlines(category);

    const now = Date.now();
    const maxAge = 48 * 60 * 60 * 1000; // 48 hours

    const uniqueArticles = new Map();

    for (const article of articles) {
        if (!article.title || !article.publishedAt) {
            continue;
        }

        const publishedTime = new Date(
            article.publishedAt
        ).getTime();

        // Condition 1: Only recent articles
        if (
            Number.isNaN(publishedTime) ||
            now - publishedTime > maxAge ||
            publishedTime > now
        ) {
            continue;
        }

        // Condition 2: Remove duplicate titles
        const titleKey = article.title
            .trim()
            .toLowerCase();

        if (!uniqueArticles.has(titleKey)) {
            uniqueArticles.set(titleKey, article);
        }
    }

    // Condition 3: Show newest articles first
    return Array.from(uniqueArticles.values())
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        )
        .slice(0, 6);
};


const getGTrendingNews = async (category = "general") => {
    const articles = await getGTopHeadlines(category);

    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000;

    const trendingKeywords = [
        "breaking",
        "major",
        "launch",
        "discovery",
        "update",
        "artificial intelligence",
        "AI",
        "record",
        "announces",
    ];

    const uniqueArticles = new Map();

    for (const article of articles) {
        if (!article.title || !article.publishedAt) {
            continue;
        }

        const publishedTime = new Date(
            article.publishedAt
        ).getTime();

        // Condition 1: Published within 24 hours
        if (
            Number.isNaN(publishedTime) ||
            now - publishedTime > maxAge ||
            publishedTime > now
        ) {
            continue;
        }

        const text =
            `${article.title} ${article.description || ""}`
                .toLowerCase();

        // Condition 2: Contains a trending keyword
        const hasTrendingKeyword = trendingKeywords.some(
            (keyword) =>
                text.includes(keyword.toLowerCase())
        );

        if (!hasTrendingKeyword) {
            continue;
        }

        // Condition 3: Remove duplicate titles
        const titleKey = article.title.trim().toLowerCase();

        if (!uniqueArticles.has(titleKey)) {
            uniqueArticles.set(titleKey, article);
        }
    }

    // Condition 4: Newest matching articles first
    return Array.from(uniqueArticles.values())
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        )
        .slice(0, 6);
};




module.exports = {
    getGTopHeadlines,
    getGLatestNews,
    getGTrendingNews
};