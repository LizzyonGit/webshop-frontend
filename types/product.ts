export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  brand: string | null;
  price: number;
  stock: number;
  description: string;
  image?: string;
  thumbnail?: string;
  added: string;
  sku: string;
  discountPercentage: number;
  minimumOrderQuantity: number;
};

export type ProductListResponse = {
  products: Product[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export type CreateProduct = {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
  brand?: string;
  slug: string;
  sku: string;
};

export type UpdateProduct = {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
  brand?: string;
};
