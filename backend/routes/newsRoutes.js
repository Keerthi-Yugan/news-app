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

router.get("/gnews", getGNews);

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