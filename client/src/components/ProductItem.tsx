import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import Rating from './Rating';
import { Store } from '../Store';
import { CartItem } from '../types/Cart';
import convertProductToCartItem from '../utils/convertProductToCartItem';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';

const ProductItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert(STRINGS.productPage.alert);
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <Card.Body>
        <Link to={`product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          key={product.slug}
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            {STRINGS.productPage.status.outOfStock}
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            {STRINGS.productPage.addToCart}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
