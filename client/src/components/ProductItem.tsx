import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import Rating from './Rating';

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Col>
      <Card>
        <Link to={`product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>
        <Card.Body>
          <Link to={`product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button>Add to cart</Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
