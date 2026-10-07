const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "World",
                "Technology",
                "Business",
                "Sports",
                "Science",
                "Entertainment",
                "Health",
            ],
        },

        author: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },
        
        views: {
            type: Number,
            default: 0,
        },

        publishedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("News", newsSchema);