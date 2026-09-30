import { prisma } from '@/lib/prisma';
import { Category } from '@/types/category';

export class CategoryRepository {
  async getAll(): Promise<Category[]> {
    return prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  }
}
