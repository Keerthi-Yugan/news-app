import Link from "next/link";

type GNewsCardProps = {
    title: string;
    description: string;
    image: string;
    url: string;
    source: string;
};

export default function GNewsCard({
    title,
    description,
    image,
    url,
    source,
}: GNewsCardProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:bg-[var(--surface-hover)] hover:shadow-md">
                <img
                    src={image}
                    alt={title}
                    className="h-28 w-full object-cover"
                />

                <div className="p-3">
                    <span className="text-xs font-semibold uppercase text-[var(--primary)]">
                        {source}
                    </span>

                    <h2 className="mt-1 line-clamp-2 min-h-12 text-base font-bold text-[var(--text-primary)]">
                        {title}
                    </h2>

                    <p className="mt-1 line-clamp-2 min-h-10 text-xs text-[var(--text-secondary)]">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}