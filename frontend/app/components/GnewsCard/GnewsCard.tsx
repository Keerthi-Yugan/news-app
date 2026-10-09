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
return ( <Link
         href={url}
         target="_blank"
         rel="noopener noreferrer"
         className="block h-full min-w-0 overflow-hidden"
     > <div className="h-full min-w-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition hover:-translate-y-1 hover:bg-[var(--surface-hover)] hover:shadow-md"> <img
                 src={image}
                 alt={title}
                 className="h-28 w-full object-cover"
             />

            <div className="min-w-0 overflow-hidden p-3">
                <span className="block truncate text-xs font-semibold uppercase text-[var(--primary)]">
                    {source}
                </span>

                <h2 className="mt-1 line-clamp-2 min-h-12 break-words text-base font-bold text-[var(--text-primary)]">
                    {title}
                </h2>

                <p className="mt-1 min-h-10 break-words text-xs text-[var(--text-secondary)] line-clamp-3">
                    {description}
                </p>
            </div>
        </div>
    </Link>
);

}
