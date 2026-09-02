import { z } from 'zod';

export const orderInputSchema = z.object({
  idempotencyKey: z.string().trim().min(1, 'idempotencyKey saknas.'),
  customer: z.object({
    name: z.string().trim().min(2, 'Namn måste vara minst 2 tecken.'),
    email: z.string().trim().email('Ange en giltig e-postadress.'),
    phone: z.string().trim().min(6, 'Ange ett giltigt telefonnummer.'),
    address: z.string().trim().min(5, 'Ange en giltig adress.'),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1),
        quantity: z.number().int().positive('Antal måste vara minst 1.'),
      }),
    )
    .min(1, 'Kundvagnen är tom.'),
});

export type OrderInput = z.infer<typeof orderInputSchema>;
