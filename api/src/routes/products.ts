import { Hono } from 'hono';
import { prisma } from '../db.js';
import { HttpError } from '../middleware/errorHandler.js';
import { productInputSchema } from '../validation/product.js';

export const productsRouter = new Hono();

productsRouter.get('/', async (c) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } });
  return c.json(products);
});

productsRouter.get('/:id', async (c) => {
  const product = await prisma.product.findUnique({ where: { id: c.req.param('id') } });
  if (!product) throw new HttpError(404, 'Produkten hittades inte.');
  return c.json(product);
});

productsRouter.post('/', async (c) => {
  const input = productInputSchema.parse(await c.req.json());
  const product = await prisma.product.create({ data: input });
  return c.json(product, 201);
});

productsRouter.put('/:id', async (c) => {
  const input = productInputSchema.parse(await c.req.json());
  const existing = await prisma.product.findUnique({ where: { id: c.req.param('id') } });
  if (!existing) throw new HttpError(404, 'Produkten hittades inte.');
  const product = await prisma.product.update({ where: { id: c.req.param('id') }, data: input });
  return c.json(product);
});

productsRouter.delete('/:id', async (c) => {
  const existing = await prisma.product.findUnique({ where: { id: c.req.param('id') } });
  if (!existing) throw new HttpError(404, 'Produkten hittades inte.');
  await prisma.product.delete({ where: { id: c.req.param('id') } });
  return c.body(null, 204);
});
