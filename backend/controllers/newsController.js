const News = require("../models/news");

const getAllNews = async (req, res) => {
    try {
        const news = await News.find()
            .sort({ publishedAt: -1 });

        res.status(200).json({
            success: true,
            data: news,
        });
    } catch (error) {
        console.error("Get news error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch news",
        });
    }
};


const createNews = async (req, res) => {
    try {
        const {
            title,
            description,
            content,
            category,
            author,
            image,
        } = req.body;

        // Basic validation
        if (
            !title ||
            !description ||
            !content ||
            !category ||
            !author
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const news = await News.create({
            title,
            description,
            content,
            category,
            author,
            image,
        });

        res.status(201).json({
            success: true,
            message: "News created successfully",
            data: news,
        });
    } catch (error) {
        console.error("Create news error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create news",
        });
    }
};

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await News.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found",
            });
        }

        res.status(200).json({
            success: true,
            data: news,
        });
    } catch (error) {
        console.error("Get news by ID error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch news",
        });
    }
};

const getNewsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const news = await News.find({
            category,
        })
            .sort({ publishedAt: -1 })
            .limit(4);

        res.status(200).json({
            success: true,
            data: news,
        });
    } catch (error) {
        console.error("Get news by category error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch category news",
        });
    }
};

const searchNews = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }

        const news = await News.find({
            $or: [
                {
                    title: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    content: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    category: {
                        $regex: query,
                        $options: "i",
                    },
                },
            ],
        }).sort({
            publishedAt: -1,
        });

        res.status(200).json({
            success: true,
            data: news,
        });
    } catch (error) {
        console.error("Search news error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to search news",
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await News.distinct("category");

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error("Get categories error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
        });
    }
};

const getTrendingNews = async (req, res) => {
    try {
        const news = await News.find()
            .sort({ views: -1 })
            .limit(6);

        res.status(200).json({
            success: true,
            data: news,
        });
    } catch (error) {
        console.error("Get trending news error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch trending news",
        });
    }
};


module.exports = {
    getAllNews,
    getNewsById,
    getNewsByCategory,
    searchNews,
    createNews,
    getCategories,
    getTrendingNews
};