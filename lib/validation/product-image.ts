import { z } from "zod";

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
] as const;

export const productImageFileSchema = z
    .instanceof(File, {
        message: "A valid image file is required.",
    })
    .refine(
        (file) => file.size > 0,
        {
            message: "Image cannot be empty.",
        }
    )
    .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        {
            message: "Image cannot be larger than 10 MB.",
        }
    )
    .refine(
        (file) =>
            ALLOWED_IMAGE_TYPES.includes(
                file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
            ),
        {
            message: "Image must be JPG, PNG, or WebP.",
        }
    );