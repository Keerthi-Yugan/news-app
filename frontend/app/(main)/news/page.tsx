import TrendingNews from "@/app/components/TrendingNews/TrendingNews";
import LatestNews from "@/app/components/LatestNews/LatestNews";
import GNewsCard from "@/app/components/GnewsCard/GnewsCard";

import {
    getAllNews,
    getTrendingNews,
    getGNews,
} from "@/services/newsService";

export default async function Home() {
    try {
        const [latestNews, trendingNews, gNews] =
            await Promise.all([
                getAllNews(),
                getTrendingNews(),
                getGNews(),
            ]);

        const liveNews = gNews.map((item, index) => ({
            id: item.url || `gnews-${index}`,
            title: item.title,
            description: item.description || "",
            category: "General",
            date: new Date(
                item.publishedAt
            ).toLocaleDateString(),
        }));

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

                {gNews.length > 0 ? (
                    <section className="mx-auto max-w-7xl px-6 py-8">
                        <h2 className="mb-5 text-2xl font-bold text-[var(--text-primary)]">
                            Latest News
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {gNews.map((item, index) => (
                                <GNewsCard
                                    key={item.url || index}
                                    title={item.title}
                                    description={item.description || ""}
                                    image={item.image}
                                    url={item.url}
                                    source={item.source.name}
                                />
                            ))}
                        </div>
                    </section>
                ) : latestNews.length > 0 ? (
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
                ) : (
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