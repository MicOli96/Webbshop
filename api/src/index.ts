import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { ordersRouter } from './routes/orders.js';
import { productsRouter } from './routes/products.js';

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API igång på http://localhost:${port}`);
});
