import Link from "next/link";

import {
    getNewsByCategory,
} from "@/services/newsService";

type CategoryPageProps = {
    params: Promise<{
        category: string;
    }>;
};

export default async function CategoryPage({
    params,
}: CategoryPageProps) {
    const { category } = await params;

    const news = await getNewsByCategory(category);

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <div className="mx-auto max-w-7xl px-6 py-10">

                <h1 className="text-3xl font-bold">
                    {category} News
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Latest news from the {category} category.
                </p>

                {news.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-lg text-[var(--text-secondary)]">
                            No news available in this category.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {news.map((item) => (
                            <Link
                                key={item._id}
                                href={`/news/${item.category}/${item._id}`}
                                className="overflow-hidden rounded-xl border bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-5">
                                    <span className="text-xs font-semibold uppercase text-[var(--primary)]">
                                        {item.category}
                                    </span>

                                    <h2 className="mt-2 line-clamp-2 text-xl font-bold">
                                        {item.title}
                                    </h2>

                                    <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">
                                        {item.description}
                                    </p>

                                    <p className="mt-4 text-xs text-gray-400">
                                        {new Date(
                                            item.publishedAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}