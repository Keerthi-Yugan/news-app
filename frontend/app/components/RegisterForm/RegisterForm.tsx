"use client";

import React, { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/services/authService";

export default function RegisterForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await registerUser({
                name,
                email,
                password,
            });

            setSuccess(response.message);
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border bg-[var(--surface)] p-8 shadow-sm">

            <div className="text-center">
                <Link
                    href="/"
                    className="text-3xl font-bold"
                >
                    News<span className="text-[var(--primary)]">AI</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold">
                    Create Account
                </h1>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Create your NewsAI account
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >

                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Email */}
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
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Password */}
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
                        placeholder="Create a password"
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium"
                    >
                        Confirm Password
                    </label>

                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                {/* Success */}
                {success && (
                    <p className="text-sm text-green-600">
                        {success}
                    </p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                >
                    Create Account
                </button>

            </form>

            <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-[var(--primary)] hover:underline"
                >
                    Login
                </Link>
            </p>

        </div>
    );
}