import { prisma } from "@/lib/prisma";

/**
 * SKU Generator:
 * ------------------------------------
 * MEN = category
 * FAS = brand
 * BRO = product title
 * 093 = unique sequence
 */
type GenerateSkuInput = {
    title: string;
    category: string;
    brand?: string | null;
};

function getPrefix(value: string): string {
    const words = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) {
        return "XXX";
    }

    /*
     * Single word:
     *
     * Fashion -> FAS
     *
     * Multiple words:
     *
     * Fashion Timepieces -> FAS
     * Brown Leather Belt Watch -> BRO
     */
    return words[0]
        .substring(0, 3)
        .toUpperCase()
        .padEnd(3, "X");
}

function getCategoryPrefix(category: string): string {
    const categoryMap: Record<string, string> = {
        "mens-shirts": "MEN",
        "mens-shoes": "MEN",
        "mens-watches": "MEN",

        "womens-bags": "WOM",
        "womens-dresses": "WOM",
        "womens-jewellery": "WOM",
        "womens-shoes": "WOM",

        beauty: "BEA",
        fragrances: "FRA",
        furniture: "FUR",
        groceries: "GRO",
        "home-decoration": "HOM",
        "kitchen-accessories": "KIT",
        laptops: "LAP",
        "mobile-accessories": "MOB",
        motorcycle: "MOT",
        "skin-care": "SKI",
        smartphones: "SMA",
        "sports-accessories": "SPO",
        sunglasses: "SUN",
        tablets: "TAB",
        tops: "TOP",
        vehicle: "VEH",
    };

    return (
        categoryMap[category.toLowerCase()] ??
        getPrefix(category)
    );
}

async function getNextSequence(
    prefix: string
): Promise<string> {
    const products = await prisma.product.findMany({
        where: {
            sku: {
                startsWith: `${prefix}-`,
            },
        },
        select: {
            sku: true,
        },
    });

    let highest = 0;

    for (const product of products) {
        const match = product.sku.match(
            new RegExp(`^${prefix}-(\\d{3})$`)
        );

        if (!match) {
            continue;
        }

        const number = Number(match[1]);

        if (number > highest) {
            highest = number;
        }
    }

    const next = highest + 1;

    return String(next).padStart(3, "0");
}

export async function generateSku({
                                      title,
                                      category,
                                      brand,
                                  }: GenerateSkuInput): Promise<string> {
    const categoryPrefix =
        getCategoryPrefix(category);

    const brandPrefix = getPrefix(
        brand || "XXX"
    );

    const titlePrefix = getPrefix(title);

    const sequencePrefix = `${categoryPrefix}-${brandPrefix}-${titlePrefix}`;

    const sequence = await getNextSequence(
        sequencePrefix
    );

    return `${sequencePrefix}-${sequence}`;
}