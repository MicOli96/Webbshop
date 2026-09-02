import { z } from 'zod';

export const productInputSchema = z.object({
  title: z.string().trim().min(2, 'Titel måste vara minst 2 tecken.'),
  description: z.string().trim().min(5, 'Beskrivning måste vara minst 5 tecken.'),
  price: z.number().positive('Pris måste vara ett tal större än 0.'),
  imageUrl: z
    .string()
    .trim()
    .regex(/^https?:\/\/.+/i, 'Ange en giltig URL som börjar med http:// eller https://.'),
  imageCredit: z.string().trim().optional().nullable(),
  stock: z.number().int('Lagerantal måste vara ett heltal.').min(0, 'Lagerantal måste vara 0 eller mer.'),
});

export type ProductInput = z.infer<typeof productInputSchema>;
