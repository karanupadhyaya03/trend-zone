import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';

const convertProductToCartItem = (product: Product): CartItem => {
  return {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  };
};

export default convertProductToCartItem;
