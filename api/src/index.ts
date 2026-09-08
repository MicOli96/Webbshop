import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { errorHandler } from './middleware/errorHandler.js';
import { ordersRouter } from './routes/orders.js';
import { productsRouter } from './routes/products.js';

const app = new Hono();
const port = Number(process.env.PORT) || 3001;

app.use(cors());

app.route('/api/products', productsRouter);
app.route('/api/orders', ordersRouter);

app.onError(errorHandler);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API igång på http://localhost:${info.port}`);
});
