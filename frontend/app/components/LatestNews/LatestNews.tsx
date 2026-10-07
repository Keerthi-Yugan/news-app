import Link from "next/link";

type LatestNewsItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
};

type LatestNewsProps = {
    news: LatestNewsItem[];
};

export default function LatestNews({
    news,
}: LatestNewsProps) {
    return (
        <section className="mx-auto max-w-7xl py-10">

            <h2 className="mb-6 text-3xl font-bold">
                Latest News
            </h2>

            {/* Horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4">

                {news.map((item) => (
                    <div
                        key={item.id}
                        className="w-72 shrink-0 rounded-xl border bg-[var(--surface)] p-5 shadow-sm md:w-[calc((100%-48px)/4)]"
                    >
                        {/* Category */}
                        <span className="text-xs font-semibold uppercase text-[var(--primary)]">
                            {item.category}
                        </span>

                        {/* Title */}
                        <Link href={`/news/${item.category}/${item.id}`}>
                            <h3 className="mt-2 line-clamp-2 text-lg text-[var(--foreground)] font-semibold">
                                {item.title}
                            </h3>
                        </Link>
                        {/* Description */}
                        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-primary)]">
                            {item.description}
                        </p>

                        {/* Date */}
                        <span className="mt-4 block text-sm text-[var(--text-secondary)] dark:text-gray-200">
                            {item.date}
                        </span>
                    </div>
                ))}

            </div>

        </section>
    );
}