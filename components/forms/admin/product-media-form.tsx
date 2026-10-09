import type { Product } from '@/types/product';

type Props = {
  product?: Product;
};

export default function ProductMediaForm({ product }: Props) {
  return (
    <section className="grid gap-5">
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-foreground">
          Thumbnail
        </label>

        <input type="file" name="thumbnail" id="thumbnail" accept="image/webp" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground" />

        {product?.thumbnail && <p className="mt-1 text-sm text-gray-500">Current image: {product.thumbnail}</p>}
      </div>

      {/* <div>
        <label htmlFor="images" className="block text-sm font-medium text-foreground">
          Images
        </label>

        <input
          type="text"
          name="images"
          id="images"
          placeholder="add URL's for images. Separate by comma."
          defaultValue={product?.images?.join(', ') ?? ''}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-foreground"
        />
      </div> */}

      {/* Dimensions ... */}
    </section>
  );
}
