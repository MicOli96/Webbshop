import { Router } from 'express';
import { prisma } from '../db.js';
import { HttpError } from '../middleware/errorHandler.js';
import { orderInputSchema } from '../validation/order.js';

export const ordersRouter = Router();

function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WB-${date}-${random}`;
}

ordersRouter.post('/', async (req, res) => {
  const input = orderInputSchema.parse(req.body);

  const existing = await prisma.order.findUnique({
    where: { idempotencyKey: input.idempotencyKey },
    include: { items: true },
  });
  if (existing) {
    res.status(200).json(existing);
    return;
  }

  const productIds = input.items.map((item) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== new Set(productIds).size) {
    throw new HttpError(400, 'En eller flera produkter i kundvagnen finns inte längre.');
  }

  const items = input.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
    };
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      idempotencyKey: input.idempotencyKey,
      customerName: input.customer.name,
      email: input.customer.email,
      phone: input.customer.phone,
      address: input.customer.address,
      total,
      items: { create: items },
    },
    include: { items: true },
  });

  res.status(201).json(order);
});

ordersRouter.get('/:id', async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: true },
  });
  if (!order) throw new HttpError(404, 'Ordern hittades inte.');
  res.json(order);
});
