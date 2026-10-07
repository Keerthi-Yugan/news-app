import Link from "next/link";

type NewsCardProps = {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
};

export default function NewsCard({
    id,
    title,
    description,
    category,
    image,
}: NewsCardProps) {
    return (

        <div className="h-full overflow-hidden rounded-xl border bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <img
                src={image}
                alt={title}
                className="h-28 w-full object-cover"
            />

            <div className="p-3">
                <span className="text-xs font-semibold uppercase text-[var(--primary)]">
                    {category}
                </span>
                <Link href={`/news/${category}/${id}`}>
                    <h2 className="mt-1 line-clamp-2 min-h-12 text-base font-bold">
                        {title}
                    </h2>
                </Link>

                <p className="mt-1 line-clamp-2 min-h-10 text-xs text-[var(--text-secondary)]">
                    {description}
                </p>
            </div>
        </div>

    );
}