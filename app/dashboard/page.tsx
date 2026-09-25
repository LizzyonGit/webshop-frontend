import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "ADMIN") {
        redirect("/admin");
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    Login successful [User Dashboard]
                </h1>

                <p className="mt-4">
                    Welcome, {session.user.name}
                </p>

                <p className="mt-2">
                    Role: {session.user.role}
                </p>

                <div className="mt-6">
                    <LogoutButton />
                </div>
            </div>
        </main>
    );
}