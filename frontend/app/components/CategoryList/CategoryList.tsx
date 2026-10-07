import Link from "next/link";

import { getCategories } from "@/services/newsService";

export default async function CategoryList() {
    try {
        const categories = await getCategories();

        return (
            <section className="border-b border-[var(--border)] bg-[var(--surface)] py-5">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 md:flex-row md:gap-30">

                    <h4 className="text-2xl font-bold">
                        Categories
                    </h4>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/news/${encodeURIComponent(category)}`}
                                className="rounded-full border px-5 py-2 text-sm font-medium transition hover:border-blue-600 hover:bg-[var(--primary)] hover:text-white"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>

                </div>
            </section>
        );
    } catch (error) {
        console.error(
            "Failed to load categories:",
            error
        );

        return null;
    }
}