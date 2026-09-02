import type { Product, ProductInput } from '../types/product';
import { getPlaceholderImage } from '../utils/placeholderImage';

// v4: fler produkter med riktiga foton (fritt licensierade, från Wikimedia Commons)
// istället för genererade platshållare. Övriga saknar en fri bild och behåller platshållaren.
const STORAGE_KEY = 'webbshop.products.v5';

const seedProducts: Product[] = [
  {
    id: 'p1',
    title: 'Muminfigurer i porslin (vintage)',
    description:
      'Handmålade porslinsfigurer av Muminpappa, Mymlan och Muminmamma, designade av Atelier Fauni på 1950-talet.',
    price: 349,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Moomin_toys.jpg',
    imageCredit: 'Foto: Helsingin kaupunginmuseo, CC BY 4.0 (Wikimedia Commons)',
    stock: 24,
  },
  {
    id: 'p2',
    title: 'Muminmugg - Mumintrollet',
    description: 'Klassisk Arabia-mugg med motiv av Mumintrollet, rymmer 3 dl.',
    price: 229,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Muumipeikko_nurmenvihre%C3%A4_cropped.jpg',
    imageCredit: 'Foto: OulunPooki5131, CC BY-SA 4.0 (Wikimedia Commons)',
    stock: 40,
  },
  {
    id: 'p7',
    title: 'Muminmugg - Rosengården',
    description: 'Arabia-mugg med rosenmotiv ur Mumin-serien, rymmer 3 dl.',
    price: 229,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Rosehage_kopp2.jpg',
    imageCredit: 'Foto: Angellsen, CC BY-SA 4.0 (Wikimedia Commons)',
    stock: 22,
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
    title: 'Mumin-kalender - Mumindalen (1973)',
    description:
      'Väggkalender med Lars Janssons vinterillustration av Mumindalen, med Mumintrollet, Snusmumriken, Lilla My och fler figurer.',
    price: 249,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mumindalen_papperskalender.jpg',
    imageCredit: 'Illustration: Lars Jansson / Gotlands museum, CC BY 4.0 (Wikimedia Commons)',
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
  {
    id: 'p8',
    title: 'Mumin-gosedjur - Muminpappa & Muminmamma',
    description: 'Mjuka gosedjur föreställande Muminpappa och Muminmamma, säljs som par.',
    price: 399,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/8f/Gone_Driveabout_18%2C_The_Moomins_contemplate_the_Australian_bush%2C_24_Oct._2010_-_Flickr_-_PhillipC.jpg',
    imageCredit: 'Foto: Phillip Capper, CC BY 2.0 (Wikimedia Commons)',
    stock: 16,
  },
  {
    id: 'p9',
    title: 'Muminglas (2-pack)',
    description: 'Pressade glastumlers med Mumin-motiv, säljs i box om två.',
    price: 259,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/New_Glasses_%2853524595881%29.jpg',
    imageCredit: 'Foto: Pete (Liverpool), CC0 (Wikimedia Commons)',
    stock: 20,
  },
  {
    id: 'p10',
    title: 'Mumin-klubbor - Lilla My',
    description: 'Klubbor med Lilla My-motiv, populärt godis från Mumindalen.',
    price: 39,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Pikku_Myy_-tikkukaramelleja.jpg',
    imageCredit: 'Foto: Kallerna, CC BY-SA 3.0 (Wikimedia Commons)',
    stock: 80,
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
