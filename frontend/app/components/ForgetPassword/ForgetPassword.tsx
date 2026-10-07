"use client";

import React, { useState } from "react";
import Link from "next/link";
import { forgotPasswordUser } from "@/services/authService";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await forgotPasswordUser(email);

            setMessage(response.message);
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border bg-[var(--surface)] p-8 shadow-sm">
            {/* Logo and heading */}
            <div className="text-center">
                <Link
                    href="/"
                    className="text-3xl font-bold"
                >
                    News<span className="text-[var(--primary)]">AI</span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold">
                    Forgot Password?
                </h1>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Enter your email address and we will send you a
                    password reset link.
                </p>
            </div>

            {/* Forgot password form */}
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
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                {/* Success message */}
                {message && (
                    <p className="text-sm text-green-600">
                        {message}
                    </p>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Sending..."
                        : "Send Reset Link"}
                </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                Remember your password?{" "}
                <Link
                    href="/login"
                    className="font-medium text-[var(--primary)] hover:underline"
                >
                    Back to Login
                </Link>
            </p>
        </div>
    );
}