export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export type ProductInput = Omit<Product, 'id'>;
