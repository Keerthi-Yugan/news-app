
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

export default function LoginForm() {
    const router = useRouter();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await loginUser({
                email,
                password,
            });

            // Save JWT token
            localStorage.setItem("token", response.token);

            // Go to home page
            router.push("/");
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border bg-[var(--surface)] p-8 shadow-sm">
            <div className="text-center">
                <Link href="/" className="text-3xl font-bold">
                    News<span className="text-[var(--primary)]">AI</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Login to your NewsAI account
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div className="text-right">
                    <Link
                        href="/forget-password"
                        className="text-sm text-[var(--primary)] hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-[var(--primary)] hover:underline"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}

