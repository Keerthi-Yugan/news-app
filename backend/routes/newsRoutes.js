
const express = require("express");
const router = express.Router();

const {
    getAllNews,
    createNews,
    getNewsById,
    getNewsByCategory,
    searchNews,
    getCategories,
    getTrendingNews,
    getGNews,
    getTrendingGNews,
} = require("../controllers/newsController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

// Get all news
router.get("/", getAllNews);

// Search and categories
router.get("/search", searchNews);
router.get("/categories", getCategories);

// Trending MongoDB news
router.get("/trending", getTrendingNews);

// Latest GNews
router.get("/gnews", getGNews);

// Trending GNews
router.get("/trending/gnews", getTrendingGNews);

// Get news by category
router.get("/category/:category", getNewsByCategory);

// Get single news
router.get("/:id", getNewsById);

// Create news - admin only
router.post("/", protect, adminOnly, createNews);

module.exports = router;

