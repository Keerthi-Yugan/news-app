"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "General", slug: "general" },
  { name: "World", slug: "world" },
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
    <nav
      aria-label="News categories"
      className="border-t border-[var(--border)] max-w-7xl flex items-start justify-start md:items-center justify-center overflow-x-auto m-auto px-6 py-4 text-[var(--primary)] font-bold"
    >


      <h3 className="shrink-0 bg-[var(--primary)] px-5 py-3 pr-8 font-bold text-white [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
        Categories
      </h3>


      <div className="mx-auto flex max-w-7xl gap-6  px-6 py-3">
        {categories.map((category) => {
          const href = `/news/${category.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.slug}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 text-sm font-medium transition-colors ${isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--foreground)] hover:text-[var(--primary)]"
                }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}