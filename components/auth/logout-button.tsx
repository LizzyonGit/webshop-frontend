"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await authClient.signOut();

        router.push("/");
        router.refresh();
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="bg-black px-4 py-2 text-white"
        >
            Logout
        </button>
    );
}