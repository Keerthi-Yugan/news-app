import NewsCard from "@/app/components/NewsCard/NewsCard";

type RelatedNewsItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
};

type RelatedNewsProps = {
    news: RelatedNewsItem[];
};

export default function RelatedNews({
    news,
}: RelatedNewsProps) {
    return (
        <section className="mt-12">

            <h2 className="mb-6 text-2xl font-bold">
                Related News
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4">
                {news.map((item) => (
                    <div
                        key={item.id}
                        className="w-72 shrink-0"
                    >
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

        </section>
    );
}