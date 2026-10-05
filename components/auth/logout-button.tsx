"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export function LogoutButton() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    async function handleLogout() {
        setIsPending(true);
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message ?? `Log out failed! Please try again.`, { duration: 2000 });

                return;
            }

            toast.success(`Logged out successfully.`);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(`Log out failed:`, error);
            toast.error(`Log out failed! Please try again.`, { duration: 2000 });
        } finally {
            setIsPending(false);
        }

    }

    return (
        <Button
            type="button"
            variant="default"
            onClick={handleLogout}
            disabled={isPending}
        >
            {isPending ? `Logging out...` : `Log out`}
        </Button>
    );
}