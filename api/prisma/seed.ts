import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedProducts = [
  {
    title: 'Muminfigurer i porslin (vintage)',
    description:
      'Handmålade porslinsfigurer av Muminpappa, Mymlan och Muminmamma, designade av Atelier Fauni på 1950-talet.',
    price: 349,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Moomin_toys.jpg',
    imageCredit: 'Foto: Helsingin kaupunginmuseo, CC BY 4.0 (Wikimedia Commons)',
    stock: 24,
  },
  {
    title: 'Muminmugg - Mumintrollet',
    description: 'Klassisk Arabia-mugg med motiv av Mumintrollet, rymmer 3 dl.',
    price: 229,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Muumipeikko_nurmenvihre%C3%A4_cropped.jpg',
    imageCredit: 'Foto: OulunPooki5131, CC BY-SA 4.0 (Wikimedia Commons)',
    stock: 40,
  },
  {
    title: 'Muminmugg - Rosengården',
    description: 'Arabia-mugg med rosenmotiv ur Mumin-serien, rymmer 3 dl.',
    price: 229,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Rosehage_kopp2.jpg',
    imageCredit: 'Foto: Angellsen, CC BY-SA 4.0 (Wikimedia Commons)',
    stock: 22,
  },
  {
    title: 'Mumin-serietidning - samlingsvolym',
    description: 'Inbunden samlingsvolym med Tove Janssons klassiska Mumin-serier.',
    price: 279,
    imageUrl: 'https://placehold.co/400x300/8fb99a/2f4a37?text=M',
    stock: 15,
  },
  {
    title: 'Mumin-necessär',
    description: 'Vattentät necessär med tryck föreställande Lilla My, rymlig och tvättbar.',
    price: 199,
    imageUrl: 'https://placehold.co/400x300/f4e2c2/8a6a3a?text=M',
    stock: 30,
  },
  {
    title: 'Mumin-kalender - Mumindalen (1973)',
    description:
      'Väggkalender med Lars Janssons vinterillustration av Mumindalen, med Mumintrollet, Snusmumriken, Lilla My och fler figurer.',
    price: 249,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mumindalen_papperskalender.jpg',
    imageCredit: 'Illustration: Lars Jansson / Gotlands museum, CC BY 4.0 (Wikimedia Commons)',
    stock: 18,
  },
  {
    title: 'Mumin-anteckningsbok',
    description: 'Inbunden anteckningsbok med linjerade sidor och Mumin-omslag.',
    price: 129,
    imageUrl: 'https://placehold.co/400x300/e3b7bd/7a3d44?text=M',
    stock: 50,
  },
  {
    title: 'Mumin-gosedjur - Muminpappa & Muminmamma',
    description: 'Mjuka gosedjur föreställande Muminpappa och Muminmamma, säljs som par.',
    price: 399,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/8f/Gone_Driveabout_18%2C_The_Moomins_contemplate_the_Australian_bush%2C_24_Oct._2010_-_Flickr_-_PhillipC.jpg',
    imageCredit: 'Foto: Phillip Capper, CC BY 2.0 (Wikimedia Commons)',
    stock: 16,
  },
  {
    title: 'Muminglas (2-pack)',
    description: 'Pressade glastumlers med Mumin-motiv, säljs i box om två.',
    price: 259,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/New_Glasses_%2853524595881%29.jpg',
    imageCredit: 'Foto: Pete (Liverpool), CC0 (Wikimedia Commons)',
    stock: 20,
  },
  {
    title: 'Mumin-klubbor - Lilla My',
    description: 'Klubbor med Lilla My-motiv, populärt godis från Mumindalen.',
    price: 39,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Pikku_Myy_-tikkukaramelleja.jpg',
    imageCredit: 'Foto: Kallerna, CC BY-SA 3.0 (Wikimedia Commons)',
    stock: 80,
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: seedProducts });
  console.log(`Seeded ${seedProducts.length} produkter.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
