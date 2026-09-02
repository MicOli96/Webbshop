import { Router } from 'express';
import { prisma } from '../db.js';
import { HttpError } from '../middleware/errorHandler.js';
import { productInputSchema } from '../validation/product.js';

export const productsRouter = Router();

productsRouter.get('/', async (_req, res) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } });
  res.json(products);
});

productsRouter.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product) throw new HttpError(404, 'Produkten hittades inte.');
  res.json(product);
});

productsRouter.post('/', async (req, res) => {
  const input = productInputSchema.parse(req.body);
  const product = await prisma.product.create({ data: input });
  res.status(201).json(product);
});

productsRouter.put('/:id', async (req, res) => {
  const input = productInputSchema.parse(req.body);
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new HttpError(404, 'Produkten hittades inte.');
  const product = await prisma.product.update({ where: { id: req.params.id }, data: input });
  res.json(product);
});

productsRouter.delete('/:id', async (req, res) => {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new HttpError(404, 'Produkten hittades inte.');
  await prisma.product.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
