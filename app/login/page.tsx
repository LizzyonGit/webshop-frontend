"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validation/user";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        const validation = loginSchema.safeParse({
            email,
            password,
        });

        if (!validation.success) {
            setError(
                validation.error.issues[0]?.message ??
                "Invalid login information."
            );
            return;
        }

        setLoading(true);

        try {
            const result = await authClient.signIn.email({
                email: validation.data.email,
                password: validation.data.password,
            });

            if (result.error) {
                setError(
                    result.error.message ??
                    "Invalid email or password."
                );
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-3xl font-bold">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                        className="border p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        autoComplete="current-password"
                        required
                        className="border p-3"
                    />

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black p-3 text-white disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-sm">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
}