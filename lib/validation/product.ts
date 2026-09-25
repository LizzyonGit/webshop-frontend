import { z } from "zod";

export const productSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(200, "Title cannot exceed 200 characters."),

    description: z
        .string()
        .trim()
        .min(1, "Description is required.")
        .max(
            10_000,
            "Description cannot exceed 10,000 characters."
        ),

    price: z
        .number({
            error: "Price must be a number.",
        })
        .finite("Price must be a valid number.")
        .min(0, "Price cannot be negative."),

    category: z
        .string()
        .trim()
        .min(1, "Category is required.")
        .max(100, "Category cannot exceed 100 characters."),

    stock: z
        .number({
            error: "Stock must be a number.",
        })
        .int("Stock must be a whole number.")
        .min(0, "Stock cannot be negative."),

    brand: z
        .string()
        .trim()
        .max(100, "Brand cannot exceed 100 characters.")
        .nullable(),
});

export type ProductInput = z.infer<
    typeof productSchema
>;