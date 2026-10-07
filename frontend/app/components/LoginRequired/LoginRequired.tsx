import React from "react";
import Link from "next/link";

type LoginRequiredProps = {
    message?: string;
};

export default function LoginRequired({
    message = "Please log in to continue.",
}: LoginRequiredProps) {
    return (
        <div className="rounded-xl border bg-[var(--surface)] p-6 text-center shadow-sm">

            <h2 className="text-lg font-bold">
                Login Required
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {message}
            </p>

            <Link
                href="/login"
                className="mt-4 inline-block rounded-lg bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
            >
                Login
            </Link>

        </div>
    );
}