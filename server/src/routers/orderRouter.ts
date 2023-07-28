import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { OrderModel } from '../models/orderModel';
import { isAuth } from '../utils/isAuth';
import { Product } from '../models/productModel';

export const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
          // instead of underlying _id (in frontend)
          // we have product (in backend) hence conversion is required
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).json({ message: 'Order created', order: createdOrder });
    }
  })
);
