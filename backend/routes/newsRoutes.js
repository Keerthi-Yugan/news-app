const express = require("express");

const router = express.Router();

const {
    getAllNews,
    getNewsById,
    getNewsByCategory,
    searchNews,
    createNews,
    getTrendingNews,
    getCategories,
} = require("../controllers/newsController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

// Get all news
router.get("/", getAllNews);

// Search news
router.get("/search", searchNews);

router.get("/categories", getCategories);


router.get("/trending", getTrendingNews);

// Get news by category
router.get("/category/:category", getNewsByCategory);


// Get single news
router.get("/:id", getNewsById);



// Create news - admin only
router.post(
    "/",
    protect,
    adminOnly,
    createNews
);

module.exports = router;