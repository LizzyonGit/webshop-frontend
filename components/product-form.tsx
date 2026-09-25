"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/categories";

export default function ProductForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");

    const [image, setImage] = useState<File | null>(
        null
    );

    const [thumbnail, setThumbnail] =
        useState<File | null>(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
      event.preventDefault();

      setError('');
      setLoading(true);

      try {
        if (!image) {
          throw new Error('Please select a product image.');
        }

        if (!thumbnail) {
          throw new Error('Please select a product thumbnail.');
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('brand', brand);

        formData.append('image', image);
        formData.append('thumbnail', thumbnail);

        const response = await fetch('/api/products', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create product.');
        }

        // Redirect to the newly created product
        router.push(`/products/${data.slug}`);

        router.refresh();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    return (




        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
        >

            <p>stock: {stock}</p>
            <p>price: {price}</p>

            {/* Title */}

            <div>
                <label
                    htmlFor="title"
                    className="block mb-2"
                >
                    Title
                </label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    required
                    className="w-full border p-3"
                />
            </div>

            {/* Description */}

            <div>
                <label
                    htmlFor="description"
                    className="block mb-2"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    value={description}
                    onChange={(event) =>
                        setDescription(
                            event.target.value
                        )
                    }
                    required
                    rows={6}
                    className="w-full border p-3"
                />
            </div>

            {/* Price */}

            <div>
                <label
                    htmlFor="price"
                    className="block mb-2"
                >
                    Price
                </label>

                <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(event) =>
                        setPrice(event.target.value)
                    }
                    required
                    className="w-full border p-3"
                />
            </div>

            {/* Category */}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-sm font-medium"
                >
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                    className="border border-border bg-white px-3 py-2"
                >
                    <option value="">
                        Select a category
                    </option>

                    {CATEGORIES.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Stock */}

            <div>
                <label
                    htmlFor="stock"
                    className="block mb-2"
                >
                    Stock
                </label>

                <input
                    id="stock"
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(event) =>
                        setStock(event.target.value)
                    }
                    required
                    className="w-full border p-3"
                />
            </div>

            {/* Brand */}

            <div>
                <label
                    htmlFor="brand"
                    className="block mb-2"
                >
                    Brand
                </label>

                <input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={(event) =>
                        setBrand(event.target.value)
                    }
                    className="w-full border p-3"
                />
            </div>

            {/* Product image */}

            <div className="bg-blue-100">
                <label
                    htmlFor="image"
                    className="block mb-2"
                >
                    Product Image
                </label>

                <input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) =>
                        setImage(
                            event.target.files?.[0] ??
                            null
                        )
                    }
                    required
                />

                <p className="mt-1 text-smtext-blue-700 ">
                    WebP image. Automatically resized
                    and cropped to 1000 × 1000px.
                </p>
            </div>

            {/* Thumbnail */}

            <div className="bg-blue-100">
                <label
                    htmlFor="thumbnail"
                    className="block mb-2 text-blue-700 "
                >
                    Thumbnail
                </label>

                <input
                    id="thumbnail"
                    type="file"
                    accept="image/webp"
                    onChange={(event) =>
                        setThumbnail(
                            event.target.files?.[0] ??
                            null
                        )
                    }
                    required
                />

                <p className="mt-1 text-sm">
                    WebP image. Automatically resized
                    and cropped to 300 × 300px.
                </p>
            </div>

            {/* Error */}

            {error && (
                <div className="border border-red-500 p-3">
                    {error}
                </div>
            )}

            {/* Submit */}

            <button
                type="submit"
                disabled={loading}
                className="border px-6 py-3"
            >
                {loading
                    ? "Creating..."
                    : "Create Product"}
            </button>
        </form>
    );
}