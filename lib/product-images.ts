import sharp from "sharp";
import { mkdir, unlink } from "fs/promises";
import path from "path";

/**
 * Image Upload
 * ----------------------------------------------------------
 * Automatically crop/resize the image to 1000×1000 WebP. even if the image is larger than 1000×1000px
 * Automatically crop/resize the thumbnail to 300×300 WebP.
 * Save them as:
 * /public/images/{slug}.webp
 * /public/thumbnails/{slug}.webp
 */

type ProductImageType =
    | "image"
    | "thumbnail";

type ProcessedImage = {
    path: string;
    url: string;
};

const allowedFormats = ["jpeg", "png", "webp"];

const IMAGE_CONFIG = {
    image: {
        width: 1000,
        height: 1000,
        directory: "images",
    },

    thumbnail: {
        width: 300,
        height: 300,
        directory: "thumbnails",
    },
} as const;

const MAX_SOURCE_DIMENSION = 10_000;

/**
 * Validate, resize/crop and save a product image.
 */
export async function saveProductImage({
                                           file,
                                           slug,
                                           type,
                                       }: {
    file: File;
    slug: string;
    type: ProductImageType;
}): Promise<ProcessedImage> {
    const config = IMAGE_CONFIG[type];

    // Convert File to Buffer
    const inputBuffer = Buffer.from(
        await file.arrayBuffer()
    );

    // -----------------------------------------
    // Read actual image metadata
    // -----------------------------------------

    let metadata;

    try {
        metadata = await sharp(
            inputBuffer
        ).metadata();
    } catch {
        throw new Error(
            "The uploaded file is not a valid image."
        );
    }

    // -----------------------------------------
    // Validate actual format
    // -----------------------------------------

    if (!metadata.format || !allowedFormats.includes(metadata.format)) {
        throw new Error(
            "The uploaded image must be a JPG, PNG, or WebP image."
        );
    }

    // -----------------------------------------
    // Validate dimensions exist
    // -----------------------------------------

    if (
        !metadata.width ||
        !metadata.height
    ) {
        throw new Error(
            "Could not determine image dimensions."
        );
    }

    // -----------------------------------------
    // Protect against extremely large images
    // -----------------------------------------

    if (
        metadata.width >
        MAX_SOURCE_DIMENSION ||
        metadata.height >
        MAX_SOURCE_DIMENSION
    ) {
        throw new Error(
            `Source image cannot exceed ${MAX_SOURCE_DIMENSION}×${MAX_SOURCE_DIMENSION}px.`
        );
    }

    // -----------------------------------------
    // Create output directory
    // -----------------------------------------

    const directory = path.join(
        process.cwd(),
        "public",
        config.directory
    );

    await mkdir(directory, {
        recursive: true,
    });

    // -----------------------------------------
    // Generate filename from server-side slug
    // -----------------------------------------

    const filename = `${slug}.webp`;

    const outputPath = path.join(
        directory,
        filename
    );

    // -----------------------------------------
    // Resize + crop + convert to WebP
    // -----------------------------------------

    try {
        await sharp(inputBuffer)
            .resize(
                config.width,
                config.height,
                {
                    fit: "cover",
                    position: "centre",
                }
            )
            .webp({
                quality: 85,
            })
            .toFile(outputPath);
    } catch {
        throw new Error(
            "Failed to process the uploaded image."
        );
    }

    // -----------------------------------------
    // Return filesystem path and public URL
    // -----------------------------------------

    return {
        path: outputPath,
        url: `/${config.directory}/${filename}`,
    };
}

/**
 * Delete a previously saved product image.
 *
 * Used for cleanup when something fails after
 * an image has already been written to disk.
 */
export async function deleteProductImage(
    filePath: string
): Promise<void> {
    try {
        unlink(filePath);
    } catch {
        // Ignore the error if the file doesn't exist.
    }
}