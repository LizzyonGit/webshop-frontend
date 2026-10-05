"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        try {
            const result = await authClient.signOut();

            console.log(result);
            if(!result.success) {
                toast.error(result.message, { duration: 1000 });

                return;
            }
            router.push("/");
            router.refresh();
            return toast.success(result.message);
        } catch (error) {
            console.error(`Log out failed:`, error);

            toast.error(`Log out failed! Please try again.`, { duration: 2000 });
        }

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