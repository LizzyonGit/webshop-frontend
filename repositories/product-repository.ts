import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { Product, ProductListResponse } from '@/types/product';

export class ProductRepository {
  async getProducts(currentPage: number, categoryParams: string, stockParams: string, queryParams: string): Promise<ProductListResponse> {
    const pageSize = 11;
    const skip = (currentPage - 1) * pageSize;

    const search = queryParams.trim();
    const category = categoryParams.trim();

    const condition: Prisma.ProductWhereInput[] = [];

    /** Search filter. **/
    if (search) {
      condition.push({
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      });
    }

    /** Category filter. **/
    if (categoryParams) {
      condition.push({
        category: category,
      });
    }

    /** Stock filter  **/

    if (stockParams === 'in-stock') {
      condition.push({
        stock: {
          gt: 0,
        },
      });
    } else if (stockParams === 'low-stock') {
      condition.push({
        stock: {
          gt: 0,
          lte: 10,
        },
      });
    } else if (stockParams === 'out-of-stock') {
      condition.push({
        stock: {
          equals: 0,
        },
      });
    }

    const where = condition.length > 0 ? { AND: condition } : {};

    const [totalItems, productList] = await Promise.all([
      prisma.product.count({
        where,
      }),

      prisma.product.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          title: 'asc',
        },
      }),
    ]);

    const products = productList.map((product) => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      category: product.category,
      brand: product.brand,
      //thumbnail: product.thumbnail,
      price: Number(product.price),
      stock: product.stock,
      description: product.description,
      sku: product.sku,
      added: product.createdAt.toISOString(),
    }));

    return {
      products,
      totalItems,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  async getProduct(slug: string) {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
    });

    if (!product) return null;

    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      category: product.category,
      brand: product.brand,
      price: Number(product.price),
      stock: product.stock,
      description: product.description,
      sku: product.sku,
      added: product.createdAt.toISOString(),
    };
  }
}
