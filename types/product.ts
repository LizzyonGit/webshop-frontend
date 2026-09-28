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
};

export type ProductListResponse = {
  products: Product[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};
