import NewsCard from "@/app/components/NewsCard/NewsCard";
import Link from "next/link";

type TrendingNewsItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
   
}

type TrendingNewsProps = {
    news: TrendingNewsItem[];
};

export default function TrendingNews({
    news,
}: TrendingNewsProps) {
    const featuredNews = news[0];
    const verticalNews = news.slice(1, 4);
    const bottomNews = news.slice(4, 6);

    return (
        <section className="mx-auto max-w-7xl py-10">

            {/* Heading */}
            <div className="mb-6 text-center">
                <p className="text-sm font-semibold uppercase text-[var(--primary)]">
                    Discover
                </p>

                <h2 className="text-3xl font-bold">
                    Trending News
                </h2>
            </div>

            {/* MAIN BLOCK */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* LEFT BLOCK
                    Big card + bottom cards
                */}
                <div className="flex flex-1 flex-col gap-4">

                    {/* BIG FEATURED CARD */}
                    {featuredNews && (
                        <div>

                            <img
                                src={featuredNews.image}
                                alt={featuredNews.title}
                                className="h-64 w-full object-cover"
                            />

                            <div className="p-4">
                                <span className="text-xs font-semibold uppercase text-[var(--primary)]">
                                    {featuredNews.category}
                                </span>

                                <Link href={`/news/${featuredNews.category}/${featuredNews.id}`}>
                                <h2 className="mt-2 line-clamp-2 text-2xl font-bold">
                                    {featuredNews.title}
                                </h2>
                                </Link>

                                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
                                    {featuredNews.description}
                                </p>
                            </div>

                        </div>
                    )}

                    {/* BOTTOM HORIZONTAL CARDS */}
                    <div className="flex flex-col md:flex-row gap-4">

                        {verticalNews.map((item) => (
                            <div key={item.id} className="flex-1">
                                <NewsCard
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    category={item.category}
                                    image={item.image}
                                />
                            </div>
                        ))}

                    </div>
                </div>

                {/* RIGHT BLOCK
                    3 Vertical Cards
                */}
                <div className="flex flex-col gap-4">

                    {bottomNews.map((item) => (
                        <NewsCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            image={item.image}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}