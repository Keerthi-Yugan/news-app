"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
{ name: "General", slug: "general" },
{ name: "World", slug: "world" },
{ name: "National", slug: "nation" },
{ name: "Technology", slug: "technology" },
{ name: "Business", slug: "business" },
{ name: "Sports", slug: "sports" },
{ name: "Science", slug: "science" },
{ name: "Entertainment", slug: "entertainment" },
{ name: "Health", slug: "health" },
];

export default function CategoryList() {
const pathname = usePathname();

return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)] py-4">
        <div className="mx-auto max-w-7xl px-6">
            <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">
                Categories
            </h3>

            <nav
                aria-label="News categories"
                className="overflow-x-auto"
            >
                <div className="flex min-w-max items-center gap-6">
                    {categories.map((category) => {
                        const href = `/category/${category.slug}`;
                        const active = pathname === href;

                        return (
                            <Link
                                key={category.slug}
                                href={href}
                                aria-current={active ? "page" : undefined}
                                className={`whitespace-nowrap border-b-2 py-2 text-sm transition-colors ${
                                    active
                                        ? "border-[var(--primary)] font-semibold text-[var(--primary)]"
                                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--primary)]"
                                }`}
                            >
                                {category.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    </section>
);
}
