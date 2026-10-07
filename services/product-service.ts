import type { ApiResponse, ApiSuccessResponse, Product, ProductDeleteResponse } from '@/app/types';
import { errorResponse } from '@/utils/error-response';

const API_URL = 'http://localhost:4000';

export default class ProductService {
  //DELETE: Product
  static async deleteProduct(productId: string): Promise<ProductDeleteResponse> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
      });

      return {
        success: true,
        message: 'Remove successful product',
      } satisfies ProductDeleteResponse;
    } catch (error) {
      return errorResponse('Kunde inte ansluta till servern.');
    }
  }

  //PATCH/EDIT: Product
  static async updateProduct(productId: number, product: Partial<Product>): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        return errorResponse('Produkten kunde inte uppdateras');
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
        message: 'Product updated successfully',
      } satisfies ApiSuccessResponse<Product>;
    } catch {
      return errorResponse('Kunde inte ansluta till servern.');
    }
  }

  //POST/CREATE: Product
  static async createProduct(product: Partial<Product>): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        return errorResponse('Produkten kunde inte skapas');
      }

      const result = await response.json();

      return {
        success: true,
        data: result,
        message: 'Product created successfully',
      } satisfies ApiSuccessResponse<Product>;
    } catch {
      return errorResponse('Kunde inte ansluta till servern.');
    }
  }
}
