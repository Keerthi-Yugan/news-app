import AISummary from "@/app/components/AISummary/AISummary";
import Comments from "@/app/components/Comments/Comments";
import NewsContent from "@/app/components/NewsContent/NewsContent";
import NewsHeader from "@/app/components/NewsHeader/NewsHeader";
import NewsMeta from "@/app/components/NewsMeta/NewsMeta";
import RelatedNews from "@/app/components/RelatedNews/RelatedNews";

import {
    getNewsById,
    getNewsByCategory,
} from "@/services/newsService";

type NewsDetailsPageProps = {
    params: Promise<{
        category: string;
        id: string;
    }>;
};

const comments = [
    {
        id: "1",
        author: "John",
        comment:
            "Interesting article about the future of AI.",
    },
    {
        id: "2",
        author: "Sarah",
        comment:
            "AI is definitely changing many industries.",
    },
];

export default async function NewsDetailsPage({
    params,
}: NewsDetailsPageProps) {
    const { category, id } = await params;

    const news = await getNewsById(id);

    console.log("News details:", news);

    const relatedNews = await getNewsByCategory(
        category
    );

    const relatedNewsData = relatedNews
        .filter((item) => item._id !== news._id)
        .map((item) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            category: item.category,
            image: item.image,
        }));

    const articleContent = news.content
        .split("\n")
        .filter(
            (paragraph) => paragraph.trim() !== ""
        );

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <main className="mx-auto max-w-5xl px-6 py-10">

                <NewsHeader
                    category={news.category}
                    title={news.title}
                    image={news.image}
                />

                <NewsMeta
                    author={news.author}
                    date={new Date(
                        news.publishedAt
                    ).toLocaleDateString()}
                    readTime="5 min read"
                />

                <AISummary
                    summary={news.description}
                />

                <NewsContent
                    content={articleContent}
                />

                <RelatedNews
                    news={relatedNewsData}
                />

                <Comments
                    comments={comments}
                />

            </main>
        </div>
    );
}