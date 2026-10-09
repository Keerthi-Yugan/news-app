
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [search, setSearch] = useState("");

    const router = useRouter();
    const pathname = usePathname();

    const toggleTheme = () => {
        setDarkMode((previous) => {
            const next = !previous;

            if (next) {
                document.documentElement.setAttribute(
                    "data-theme",
                    "dark"
                );
            } else {
                document.documentElement.removeAttribute(
                    "data-theme"
                );
            }

            return next;
        });
    };

    const handleSearch = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const query = search.trim();

        if (!query) return;

        router.push(`/search?q=${encodeURIComponent(query)}`);
        setSearch("");
    };

    return (
        <header className="border-b border-[var(--border)] bg-[var(--surface)]">
            {/* Main navbar */}
            <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
                <Link
                    href="/"
                    className="shrink-0 text-2xl font-bold"
                >
                    News<span className="text-[var(--primary)]">AI</span>
                </Link>

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    className="ml-auto hidden w-full max-w-sm md:flex"
                >
                    <div className="flex w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)]">
                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search news..."
                            className="w-full bg-transparent px-4 py-2 text-sm outline-none"
                        />

                        <button
                            type="submit"
                            className="cursor-pointer bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Theme and Login */}
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        className="cursor-pointer rounded-full border border-[var(--border)] px-3 py-2 text-sm"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <Link
                        href="/login"
                        className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {/* Categories */}
            
        </header>
    );
}

