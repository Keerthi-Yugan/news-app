import TrendingNews from "@/app/components/TrendingNews/TrendingNews";
import LatestNews from "@/app/components/LatestNews/LatestNews";

import {
    getAllNews,
    getTrendingNews,
} from "@/services/newsService";

export default async function Home() {
    try {
        const [latestNews, trendingNews] =
            await Promise.all([
                getAllNews(),
                getTrendingNews(),
            ]);

        return (
            <main>
                {trendingNews.length > 0 && (
                    <TrendingNews
                        news={trendingNews.map((item) => ({
                            id: item._id,
                            title: item.title,
                            description: item.description,
                            category: item.category,
                            image: item.image,
                        }))}
                    />
                )}

                {latestNews.length > 0 && (
                    <LatestNews
                        news={latestNews.map((item) => ({
                            id: item._id,
                            title: item.title,
                            description: item.description,
                            category: item.category,
                            date: new Date(
                                item.publishedAt
                            ).toLocaleDateString(),
                        }))}
                    />
                )}

                {latestNews.length === 0 &&
                    trendingNews.length === 0 && (
                        <div className="mx-auto max-w-7xl px-6 py-10">
                            <p className="text-center text-[var(--text-secondary)]">
                                No news available.
                            </p>
                        </div>
                    )}
            </main>
        );
    } catch (error) {
        console.error("Failed to load news:", error);

        return (
            <div className="mx-auto max-w-7xl px-6 py-10">
                <p className="text-center text-red-600">
                    Failed to load news.
                </p>
            </div>
        );
    }
}