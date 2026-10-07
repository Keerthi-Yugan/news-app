"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [search, setSearch] = useState("");

    const router = useRouter();

    const toggleTheme = () => {
        setDarkMode(!darkMode);

        if (!darkMode) {
            document.documentElement.setAttribute(
                "data-theme",
                "dark"
            );
        } else {
            document.documentElement.removeAttribute(
                "data-theme"
            );
        }
    };

    const handleSearch = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const query = search.trim();

        if (!query) {
            return;
        }

        router.push(
            `/search?q=${encodeURIComponent(query)}`
        );

        setSearch("");
    };

    return (
        <header className="border-b border-[var(--border)] bg-[var(--surface)] dark:bg-gray-950">
            <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0 text-2xl font-bold"
                >
                    News<span className="text-[var(--primary)]">AI</span>
                </Link>

                {/* Navigation */}
                {/* <nav className="hidden items-center gap-5 lg:flex">
                    <Link
                        href="/"
                        className="hover:text-[var(--primary)]"
                    >
                        Home
                    </Link>

                    <Link
                        href="/category/World"
                        className="hover:text-[var(--primary)]"
                    >
                        World
                    </Link>

                    <Link
                        href="/category/Technology"
                        className="hover:text-[var(--primary)]"
                    >
                        Technology
                    </Link>

                    <Link
                        href="/category/Business"
                        className="hover:text-[var(--primary)]"
                    >
                        Business
                    </Link>

                    <Link
                        href="/category/Sports"
                        className="hover:text-[var(--primary)]"
                    >
                        Sports
                    </Link>
                </nav> */}

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    className="ml-auto hidden w-full max-w-sm md:flex"
                >
                    <div className="flex w-full overflow-hidden rounded-lg border bg-[var(--background)]">
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

                {/* Theme + Login */}
                <div className="flex shrink-0 items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="cursor-pointer rounded-full border px-3 py-2 text-sm"
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
        </header>
    );
}