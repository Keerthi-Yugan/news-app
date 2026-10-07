import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

export type NewsItem = {
    _id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    author: string;
    image: string;
    publishedAt: string;
};

export async function getAllNews() {
    const response = await axios.get(API_URL);

    return response.data.data as NewsItem[];
}

export async function getNewsById(id: string) {
    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data.data as NewsItem;
}

export async function getNewsByCategory(category: string) {
    const response = await axios.get(
        `${API_URL}/category/${encodeURIComponent(category)}`
    );

    return response.data.data as NewsItem[];
}

export async function searchNews(query: string) {
    const response = await axios.get(
        `${API_URL}/search`,
        {
            params: {
                query,
            },
        }
    );

    return response.data.data as NewsItem[];
}

export async function getCategories() {
    const response = await axios.get(
        `${API_URL}/categories`
    );

    return response.data.data as string[];
}

export async function getTrendingNews() {
    const response = await axios.get(
        `${API_URL}/trending`
    );

    return response.data.data as NewsItem[];
}