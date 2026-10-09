'use server';

import { revalidatePath } from 'next/cache';
import { addProductSchema, editProduct } from '@/schemas/validation-schema';
import { ProductRepository } from '@/repositories/product-repository';
import { CreateProduct, UpdateProduct } from '@/types/product';
import { saveProductImage } from '@/utils/product-image-saver';

const productRepository = new ProductRepository();

export async function deleteProduct(productId: string) {
  try {
    await productRepository.deleteProduct(productId);
    // Telling NEXT.JS That product list needs to be updated
    revalidatePath('/');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    console.error('Error while deleting product', error);
    return {
      success: false,
      message: 'Product could not be deleted',
    };
  }
}

// Convert FormData values into the format expected by ProductService
async function getProductFromFormData(formData: FormData): Promise<CreateProduct> {
  const title = formData.get('title')?.toString() ?? '';

  const slug = title.toLowerCase().trim().replace(/\s+/g, '-');

  const image = formData.get('thumbnail');

  if (image instanceof File && image.size > 0) {
    await saveProductImage(image, slug);
  }

  return {
    title,
    description: formData.get('description')?.toString() ?? '',
    brand: formData.get('brand')?.toString() || undefined,
    categoryId: Number(formData.get('categoryId')),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
    slug,
    sku: `SKU-${Date.now()}`,
  };
}

function getUpdateProductFromFormData(formData: FormData): UpdateProduct {
  return {
    title: formData.get('title')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
    brand: formData.get('brand')?.toString() || undefined,
    categoryId: Number(formData.get('categoryId')),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
  };
}

export async function updateProduct(productId: string, _previousState: { success: boolean; message: string }, formData: FormData) {
  const validation = editProduct.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    brand: formData.get('brand'),
    tags: formData.get('tags'),
    categoryId: formData.get('categoryId'),

    price: formData.get('price'),
    discountPercentage: formData.get('discountPercentage'),
    stock: formData.get('stock'),
    minimumOrderQuantity: formData.get('minimumOrderQuantity'),

    height: formData.get('height'),
    width: formData.get('width'),
    depth: formData.get('depth'),
  });

  if (!validation.success) {
    console.log('Update validation errors:', validation.error.issues);

    return {
      success: false,
      message: validation.error.issues[0].message,
    };
  }

  try {
    const product = getUpdateProductFromFormData(formData);

    await productRepository.updateProduct(productId, product);

    revalidatePath('/');

    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (error) {
    console.error('Error while updating product:', error);

    return {
      success: false,
      message: 'Product could not be updated',
    };
  }
}

export async function createProduct(_previousState: { success: boolean; message: string }, formData: FormData) {
  const validation = addProductSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    brand: formData.get('brand'),
    tags: formData.get('tags'),
    categoryId: formData.get('categoryId'),

    price: formData.get('price'),
    discountPercentage: formData.get('discountPercentage'),
    stock: formData.get('stock'),
    minimumOrderQuantity: formData.get('minimumOrderQuantity'),

    height: formData.get('height'),
    width: formData.get('width'),
    depth: formData.get('depth'),
  });

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
    };
  }

  try {
    const product = await getProductFromFormData(formData);

    await productRepository.addProduct(product);

    revalidatePath('/');

    return {
      success: true,
      message: 'Product created successfully',
    };
  } catch (error) {
    console.error('Error while creating product:', error);

    return {
      success: false,
      message: 'Product could not be created',
    };
  }
}
