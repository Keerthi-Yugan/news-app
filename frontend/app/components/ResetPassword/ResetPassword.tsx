"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordForm() {
    const params = useParams();
    const router = useRouter();

    const token = params.token as string;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters"
            );
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/reset-password",
                {
                    token,
                    password,
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                    "Unable to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border bg-[var(--surface)] p-8 shadow-sm">

            {/* Logo */}
            <div className="text-center">
                <Link
                    href="/"
                    className="text-3xl font-bold"
                >
                    News<span className="text-[var(--primary)]">
                        AI
                    </span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold">
                    Reset Password
                </h1>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Enter your new password below.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >

                {/* New Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium"
                    >
                        New Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter new password"
                        required
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
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(
                                event.target.value
                            )
                        }
                        placeholder="Confirm new password"
                        required
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
                {message && (
                    <p className="text-sm text-green-600">
                        {message}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Resetting..."
                        : "Reset Password"}
                </button>
            </form>

            {/* Login */}
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