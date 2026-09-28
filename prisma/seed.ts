import { prisma } from "@/lib/prisma";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Run with: npx prisma sku seed
// (add `"seed": "tsx prisma/seed.ts"` under `"prisma"` in package.json, or use ts-node)

type ProductJson = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand?: string;
  sku: string;
  images?: string[];
};

type ProductsJson = {
  products: ProductJson[];
};

/**
 * Convert a product title to a URL-friendly slug.
 *
 * Example:
 * "Eyeshadow Palette with Mirror"
 * -> "eyeshadow-palette-with-mirror"
 */
function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * The JSON does not contain a category field.
 *
 * The category is present in the image URL:
 *
 * https://cdn.dummyjson.com/product-images/beauty/...
 *                                             ^^^^^^
 *
 * Therefore we extract it from the first image URL.
 */
function getCategory(images?: string[]): string {
  if (!images?.length) {
    return "uncategorized";
  }

  const match = images[0].match(
    /product-images\/([^/]+)\//
  );

  return match?.[1] ?? "uncategorized";
}

async function main() {
  const jsonPath = path.join(process.cwd(), "../data/products.json");

  const file = await readFile(jsonPath, "utf8");
  const data: ProductsJson = JSON.parse(file);

  console.log(`Found ${data.products.length} products.`);

  /**
   * Optional: clear existing products before seeding.
   *
   * Remove this line if you don't want the seed to delete
   * existing products.
   */
  await prisma.product.deleteMany();

  const products = data.products.map((product) => ({
    slug: slugify(product.title),
    title: product.title,
    description: product.description,
    price: product.price,
    category: getCategory(product.images),
    stock: product.stock,
    brand: product.brand ?? null,
    sku: product.sku,
  }));

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log(
    `Successfully seeded ${products.length} products.`
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });