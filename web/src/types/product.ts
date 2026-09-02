export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  /** Fotograf/licens för imageUrl, t.ex. "Foto: Namn, CC BY-SA 4.0 (Wikimedia Commons)". */
  imageCredit?: string;
}

export type ProductInput = Omit<Product, 'id'>;
