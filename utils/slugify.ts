import { prisma } from "@/lib/prisma";

function createSlug(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

// Checks if slug is unique. If not, it adds a dash and a digit like: lego-2
export async function createUniqueSlug(
    title: string
): Promise<string> {
    const baseSlug = createSlug(title);

    let slug = baseSlug;
    let counter = 2;

    while (
        await prisma.product.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        })
        ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}
/*
USAGE Examples
********************************
normalize('NFKD') + stripping combining marks handles accented characters (é, ñ, etc.) gracefully instead of just
deleting them.
If you need uniqueness (e.g., two posts titled "Hello World"), you'll want to check the generated slug against
existing ones in your database and append a suffix (-2, -3, etc.) if there's a collision — that logic lives wherever
you're creating the blog post, not in the slugify function itself.
If you're using this in a Server Action or Route Handler to create posts, just import it: import { slugify }
from '@/lib/slugify'

slugify("Hello, World! This is Next.js 16 🚀");
// -> "hello-world-this-is-nextjs-16"

slugify("Café con leche: My Trip to México");
// -> "cafe-con-leche-my-trip-to-mexico"


 */