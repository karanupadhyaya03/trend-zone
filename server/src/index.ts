import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { productRouter } from './routers/productRouter';
import { seedRouter } from './routers/seedRouter';
import { userRouter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/trendzonedb';
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((e) => console.log(`mongodb error: ${e.message}`));

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

// to access the body inside post request inside api handler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
