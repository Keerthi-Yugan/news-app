
import TrendingNews from "@/app/components/TrendingNews/TrendingNews";
import GNewsCard from "@/app/components/GnewsCard/GnewsCard";

import {
    getAllGNews,
    getTrendingGNews,
} from "@/services/newsService";

export default async function Home() {
    try {
        const [latestNews, trendingNews] = await Promise.all([
            getAllGNews(),
            getTrendingGNews(),
        ]);

        return (
            <main>
                {trendingNews.length > 0 && (
                    <TrendingNews
                        news={trendingNews.map((item, index) => ({
                            id: item.url || `trending-${index}`,
                            title: item.title,
                            description: item.description || "",
                            category: "Trending",
                            image: item.image,
                        }))}
                    />
                )}

                {latestNews.length > 0 ? (
                    <section className="mx-auto max-w-7xl px-6 py-8">
                        <h2 className="mb-5 text-2xl font-bold text-[var(--text-primary)]">
                            Latest News
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {latestNews.map((item, index) => (
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
                ) : (
                    <p className="px-6 py-10 text-center text-[var(--text-secondary)]">
                        No latest news available.
                    </p>
                )}
            </main>
        );
    } catch (error) {
        console.error("Failed to load GNews:", error);

        return (
            <p className="px-6 py-10 text-center text-red-600">
                Failed to load news.
            </p>
        );
    }
}

