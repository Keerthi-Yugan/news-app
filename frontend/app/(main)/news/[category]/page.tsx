
import GNewsCard from "@/app/components/GnewsCard/GnewsCard";
import { getAllGNews } from "@/services/newsService";

type CategoryPageProps = {
    params: Promise<{
        category: string;
    }>;
};

const categoryNames: Record<string, string> = {
    general: "General",
    world: "World",
    nation: "National",
    technology: "Technology",
    business: "Business",
    sports: "Sports",
    science: "Science",
    entertainment: "Entertainment",
    health: "Health",
};

export default async function CategoryPage({
    params,
}: CategoryPageProps) {
    const { category } = await params;
    const categorySlug = category.toLowerCase();
    const categoryTitle =
        categoryNames[categorySlug] || "News";

    try {
        const news = await getAllGNews(categorySlug);

        return (
            <main className="mx-auto min-h-screen max-w-7xl px-6 py-8">
                <h1 className="mb-2 text-3xl font-bold text-[var(--text-primary)]">
                    {categoryTitle} News
                </h1>

                <p className="mb-8 text-[var(--text-secondary)]">
                    Latest {categoryTitle.toLowerCase()} news and updates.
                </p>

                {news.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {news.map((item, index) => (
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
                ) : (
                    <p className="py-10 text-center text-[var(--text-secondary)]">
                        No {categoryTitle.toLowerCase()} news available right now.
                    </p>
                )}
            </main>
        );
    } catch (error) {
        console.error("Failed to load category news:", error);

        return (
            <main className="mx-auto max-w-7xl px-6 py-10">
                <p className="text-center text-red-600">
                    Unable to load news. Please try again later.
                </p>
            </main>
        );
    }
}
