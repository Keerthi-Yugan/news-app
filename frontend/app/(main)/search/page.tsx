import Link from "next/link";

import { searchNews } from "@/services/newsService";

type SearchPageProps = {
    searchParams: Promise<{
        q?: string;
    }>;
};

export default async function SearchPage({
    searchParams,
}: SearchPageProps) {
    const params = await searchParams;

    const query = params.q || "";

    const news = query
        ? await searchNews(query)
        : [];

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <div className="mx-auto max-w-7xl px-6 py-10">

                <h1 className="text-3xl font-bold">
                    Search Results
                </h1>

                {query && (
                    <p className="mt-2 text-[var(--text-secondary)]">
                        Results for "{query}"
                    </p>
                )}

                {news.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-lg text-[var(--text-secondary)]">
                            No news found.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {news.map((item) => (
                            <Link
                                key={item._id}
                                href={`/news/${item._id}`}
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