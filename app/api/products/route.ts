import { prisma } from "@/lib/prisma";
import { createUniqueSlug } from "@/utils/slugify";
import { generateSku } from "@/utils/sku";
import { saveProductImage,  deleteProductImage } from "@/lib/product-images";
import {
    productSchema,
} from "@/lib/validation/product";
import {
    productImageFileSchema,
} from "@/lib/validation/product-image";

export const runtime = "nodejs";

export async function POST(
    request: Request
) {
    let imagePath: string | null = null;
    let thumbnailPath: string | null = null;

    try {
        // ========================================
        // Read multipart/form-data
        // ========================================

        const formData =
            await request.formData();

        // ========================================
        // Read product fields
        // ========================================

        const title = String(
            formData.get("title") ?? ""
        ).trim();

        const description = String(
            formData.get("description") ?? ""
        ).trim();

        const price = Number(
            formData.get("price")
        );

        const category = String(
            formData.get("category") ?? ""
        ).trim();

        const stock = Number(
            formData.get("stock") ?? 0
        );

        const brandValue = String(
            formData.get("brand") ?? ""
        ).trim();

        const brand =
            brandValue === ""
                ? null
                : brandValue;

        // ========================================
        // Read uploaded files
        // ========================================

        const image =
            formData.get("image");

        const thumbnail =
            formData.get("thumbnail");

        // ========================================
        // Validate product
        // ========================================

        const productValidation =
            productSchema.safeParse({
                title,
                description,
                price,
                category,
                stock,
                brand,
            });

        if (!productValidation.success) {
            return Response.json(
                {
                    error:
                        productValidation.error
                            .issues[0]?.message ??
                        "Invalid product data.",
                },
                {
                    status: 400,
                }
            );
        }

        // ========================================
        // Validate image file
        // ========================================

        const imageValidation =
            productImageFileSchema.safeParse(
                image
            );

        if (!imageValidation.success) {
            return Response.json(
                {
                    error:
                        imageValidation.error
                            .issues[0]?.message ??
                        "Invalid product image.",
                },
                {
                    status: 400,
                }
            );
        }

        // ========================================
        // Validate thumbnail file
        // ========================================

        const thumbnailValidation =
            productImageFileSchema.safeParse(
                thumbnail
            );

        if (
            !thumbnailValidation.success
        ) {
            return Response.json(
                {
                    error:
                        thumbnailValidation.error
                            .issues[0]?.message ??
                        "Invalid thumbnail.",
                },
                {
                    status: 400,
                }
            );
        }

        // ========================================
        // Get validated product data
        // ========================================

        const {
            title: validTitle,
            description:
                validDescription,
            price: validPrice,
            category: validCategory,
            stock: validStock,
            brand: validBrand,
        } = productValidation.data;

        // ========================================
        // Generate unique slug
        // ========================================

        const slug =
            await createUniqueSlug(
                validTitle
            );

        // ========================================
        // Generate SKU
        // ========================================

        const sku =
            await generateSku({
                title: validTitle,
                category: validCategory,
                brand: validBrand,
            });

        // ========================================
        // Process and save product image
        // ========================================

        const savedImage =
            await saveProductImage({
                file: imageValidation.data,
                slug,
                type: "image",
            });

        imagePath = savedImage.path;

        // ========================================
        // Process and save thumbnail
        // ========================================

        const savedThumbnail =
            await saveProductImage({
                file:
                thumbnailValidation.data,
                slug,
                type: "thumbnail",
            });

        thumbnailPath =
            savedThumbnail.path;

        // ========================================
        // Create database record
        // ========================================

        const product =
            await prisma.product.create({
                data: {
                    title: validTitle,
                    slug,
                    description:
                    validDescription,
                    price: validPrice,
                    category: validCategory,
                    stock: validStock,
                    brand: validBrand,
                    sku,
                },
            });

        // ========================================
        // Success
        // ========================================

        return Response.json(
            {
                id: product.id,
                slug: product.slug,
                title: product.title,
                sku: product.sku,

                image:
                savedImage.url,

                thumbnail:
                savedThumbnail.url,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "Create product error:",
            error
        );

        // ========================================
        // Cleanup files if something failed
        // ========================================

        if (imagePath) {
            await deleteProductImage(
                imagePath
            );
        }

        if (thumbnailPath) {
            await deleteProductImage(
                thumbnailPath
            );
        }

        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to create product.",
            },
            {
                status: 500,
            }
        );
    }
}