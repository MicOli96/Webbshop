import type { Product, ProductInput } from '../types/product';
import { getPlaceholderImage } from '../utils/placeholderImage';

// v2: fler produkter + stiliserade platshållarbilder istället för externa foton.
const STORAGE_KEY = 'webbshop.products.v2';

const seedProducts: Product[] = [
  {
    id: 'p1',
    title: 'Mumintrollet gosedjur',
    description: 'Mjukt gosedjur föreställande Mumintrollet, 30 cm, i mjuk plysch.',
    price: 349,
    imageUrl: getPlaceholderImage('p1', 'Mumintrollet gosedjur'),
    stock: 24,
  },
  {
    id: 'p2',
    title: 'Muminmugg - Snusmumriken',
    description: 'Klassisk Arabia-mugg med motiv av Snusmumriken, rymmer 3 dl.',
    price: 229,
    imageUrl: getPlaceholderImage('p2', 'Muminmugg - Snusmumriken'),
    stock: 40,
  },
  {
    id: 'p3',
    title: 'Mumin-serietidning - samlingsvolym',
    description: 'Inbunden samlingsvolym med Tove Janssons klassiska Mumin-serier.',
    price: 279,
    imageUrl: getPlaceholderImage('p3', 'Mumin-serietidning - samlingsvolym'),
    stock: 15,
  },
  {
    id: 'p4',
    title: 'Mumin-necessär',
    description: 'Vattentät necessär med tryck föreställande Lilla My, rymlig och tvättbar.',
    price: 199,
    imageUrl: getPlaceholderImage('p4', 'Mumin-necessär'),
    stock: 30,
  },
  {
    id: 'p5',
    title: 'Muminpussel - Mumindalen',
    description: '500 bitar, motiv av hela Mumindalen, för hela familjen.',
    price: 249,
    imageUrl: getPlaceholderImage('p5', 'Muminpussel - Mumindalen'),
    stock: 18,
  },
  {
    id: 'p6',
    title: 'Mumin-anteckningsbok',
    description: 'Inbunden anteckningsbok med linjerade sidor och Mumin-omslag.',
    price: 129,
    imageUrl: getPlaceholderImage('p6', 'Mumin-anteckningsbok'),
    stock: 50,
  },
];

// Simulerar nätverksfördröjning så att UI:t beter sig som mot ett riktigt API.
function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function readAll(): Product[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }
  try {
    return JSON.parse(raw) as Product[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }
}

function writeAll(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function generateId(): string {
  return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function getProducts(): Promise<Product[]> {
  return delay(readAll());
}

export function getProduct(id: string): Promise<Product | undefined> {
  return delay(readAll().find((p) => p.id === id));
}

export function addProduct(input: ProductInput): Promise<Product> {
  const products = readAll();
  const product: Product = { ...input, id: generateId() };
  writeAll([...products, product]);
  return delay(product);
}

export function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const products = readAll();
  const updated: Product = { ...input, id };
  writeAll(products.map((p) => (p.id === id ? updated : p)));
  return delay(updated);
}

export function deleteProduct(id: string): Promise<void> {
  const products = readAll();
  writeAll(products.filter((p) => p.id !== id));
  return delay(undefined);
}
