// src/lib/products.ts

import { prisma } from "@/lib/prisma";

export type ProductSort =
    | "newest"
    | "oldest"
    | "price-asc"
    | "price-desc"
    | "title-asc"
    | "title-desc";

export type ProductResult = {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    brand: string | null;
    sku: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductsResult = {
    products: ProductResult[];
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
};

function buildTsQuery(search: string): string {
    return search
        .trim()
        .split(/\s+/)
        .map((word) =>
            word.replace(/[^\p{L}\p{N}_-]/gu, "")
        )
        .filter(Boolean)
        .join(" & ");
}

export async function getProducts({
                                      search = "",
                                      category = "",
                                      sort = "newest",
                                      page = 1,
                                      pageSize = 12,
                                  }: {
    search?: string;
    category?: string;
    sort?: ProductSort;
    page?: number;
    pageSize?: number;
}): Promise<ProductsResult> {
    const tsQuery = buildTsQuery(search);
    const cleanCategory = category.trim();

    const currentPage = Math.max(1, page);
    const safePageSize = Math.max(1, pageSize);
    const offset = (currentPage - 1) * safePageSize;

    let products: ProductResult[];
    let countResult: { count: bigint }[];

    /*
     * SEARCH + CATEGORY
     */
    if (tsQuery && cleanCategory) {
        countResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) AS "count"
      FROM "products"
      WHERE
        "search_vector" @@ to_tsquery('english', ${tsQuery})
        AND "category" = ${cleanCategory}
    `;

        switch (sort) {
            case "price-asc":
                products = await prisma.$queryRaw<ProductResult[]>`
          SELECT
            "id",
            "slug",
            "title",
            "description",
            "price"::float8 AS "price",
            "category",
            "stock",
            "brand",
            "sku",
            "createdAt",
            "updatedAt"
          FROM "products"
          WHERE
            "search_vector" @@ to_tsquery('english', ${tsQuery})
            AND "category" = ${cleanCategory}
          ORDER BY "price" ASC
          LIMIT ${safePageSize}
          OFFSET ${offset}
        `;
                break;

            case "price-desc":
                products = await prisma.$queryRaw<ProductResult[]>`
          SELECT
            "id",
            "slug",
            "title",
            "description",
            "price"::float8 AS "price",
            "category",
            "stock",
            "brand",
            "sku",
            "createdAt",
            "updatedAt"
          FROM "products"
          WHERE
            "search_vector" @@ to_tsquery('english', ${tsQuery})
            AND "category" = ${cleanCategory}
          ORDER BY "price" DESC
          LIMIT ${safePageSize}
          OFFSET ${offset}
        `;
                break;

            case "title-asc":
                products = await prisma.$queryRaw<ProductResult[]>`
          SELECT
            "id",
            "slug",
            "title",
            "description",
            "price"::float8 AS "price",
            "category",
            "stock",
            "brand",
            "sku",
            "createdAt",
            "updatedAt"
          FROM "products"
          WHERE
            "search_vector" @@ to_tsquery('english', ${tsQuery})
            AND "category" = ${cleanCategory}
          ORDER BY "title" ASC
          LIMIT ${safePageSize}
          OFFSET ${offset}
        `;
                break;

            case "title-desc":
                products = await prisma.$queryRaw<ProductResult[]>`
          SELECT
            "id",
            "slug",
            "title",
            "description",
            "price"::float8 AS "price",
            "category",
            "stock",
            "brand",
            "sku",
            "createdAt",
            "updatedAt"
          FROM "products"
          WHERE
            "search_vector" @@ to_tsquery('english', ${tsQuery})
            AND "category" = ${cleanCategory}
          ORDER BY "title" DESC
          LIMIT ${safePageSize}
          OFFSET ${offset}
        `;
                break;

            case "oldest":
                products = await prisma.$queryRaw<ProductResult[]>`
          SELECT
            "id",
            "slug",
            "title",
            "description",
            "price"::float8 AS "price",
            "category",
            "stock",
            "brand",
            "sku",
            "createdAt",
            "updatedAt"
          FROM "products"
          WHERE
            "search_vector" @@ to_tsquery('english', ${tsQuery})
            AND "category" = ${cleanCategory}
          ORDER BY "createdAt" ASC
          LIMIT ${safePageSize}
          OFFSET ${offset}
        `;
                break;

            case "newest":
            default:
                products = await prisma.$queryRaw<ProductResult[]>`
          SELECT
            "id",
            "slug",
            "title",
            "description",
            "price"::float8 AS "price",
            "category",
            "stock",
            "brand",
            "sku",
            "createdAt",
            "updatedAt"
          FROM "products"
          WHERE
            "search_vector" @@ to_tsquery('english', ${tsQuery})
            AND "category" = ${cleanCategory}
          ORDER BY "createdAt" DESC
          LIMIT ${safePageSize}
          OFFSET ${offset}
        `;
                break;
        }
    }

    /*
     * SEARCH ONLY
     */
    else if (tsQuery) {
        countResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) AS "count"
      FROM "products"
      WHERE "search_vector" @@ to_tsquery('english', ${tsQuery})
    `;

        products = await prisma.$queryRaw<ProductResult[]>`
      SELECT
        "id",
        "slug",
        "title",
        "description",
        "price"::float8 AS "price",
        "category",
        "stock",
        "brand",
        "sku",
        "createdAt",
        "updatedAt"
      FROM "products"
      WHERE "search_vector" @@ to_tsquery('english', ${tsQuery})
      ORDER BY "createdAt" DESC
      LIMIT ${safePageSize}
      OFFSET ${offset}
    `;
    }

    /*
     * CATEGORY ONLY
     */
    else if (cleanCategory) {
        countResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) AS "count"
      FROM "products"
      WHERE "category" = ${cleanCategory}
    `;

        products = await prisma.$queryRaw<ProductResult[]>`
      SELECT
        "id",
        "slug",
        "title",
        "description",
        "price"::float8 AS "price",
        "category",
        "stock",
        "brand",
        "sku",
        "createdAt",
        "updatedAt"
      FROM "products"
      WHERE "category" = ${cleanCategory}
      ORDER BY "createdAt" DESC
      LIMIT ${safePageSize}
      OFFSET ${offset}
    `;
    }

    /*
     * NO FILTERS
     */
    else {
        countResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) AS "count"
      FROM "products"
    `;

        products = await prisma.$queryRaw<ProductResult[]>`
      SELECT
        "id",
        "slug",
        "title",
        "description",
        "price"::float8 AS "price",
        "category",
        "stock",
        "brand",
        "sku",
        "createdAt",
        "updatedAt"
      FROM "products"
      ORDER BY "createdAt" DESC
      LIMIT ${safePageSize}
      OFFSET ${offset}
    `;
    }

    const total = Number(countResult[0]?.count ?? 0);
    const totalPages = Math.ceil(total / safePageSize);

    return {
        products,
        total,
        totalPages,
        page: currentPage,
        pageSize: safePageSize,
    };
}