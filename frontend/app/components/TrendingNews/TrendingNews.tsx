
import Link from "next/link";
import NewsCard from "@/app/components/NewsCard/NewsCard";

type TrendingNewsItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

type TrendingNewsProps = {
  news: TrendingNewsItem[];
};

export default function TrendingNews({ news }: TrendingNewsProps) {
  const featuredNews = news[0];
  const verticalNews = news.slice(1, 4);
  const bottomNews = news.slice(4, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">
          Discover
        </p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Trending News
        </h2>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Left section */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          {/* Featured news */}
          {featuredNews && (
            <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition-shadow hover:shadow-md">
              <Link
                href={`/news/${featuredNews.category}/${featuredNews.id}`}
                className="group block"
              >
                <div className="overflow-hidden">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-80"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                    {featuredNews.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug transition-colors group-hover:text-[var(--primary)] sm:text-2xl">
                    {featuredNews.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {featuredNews.description}
                  </p>
                </div>
              </Link>
            </article>
          )}

          {/* Three horizontal cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {verticalNews.map((item) => (
              <div key={item.id} className="min-w-0">
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

        {/* Right sidebar */}
        <aside className="flex min-w-0 flex-col gap-5 lg:col-span-1">
          <h3 className="border-b border-[var(--border)] pb-3 text-lg font-bold">
            More Trending
          </h3>

          {bottomNews.map((item) => (
            <div key={item.id} className="min-w-0">
              <NewsCard
                id={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}