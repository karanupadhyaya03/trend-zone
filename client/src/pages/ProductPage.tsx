import { Helmet } from 'react-helmet-async';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ApiError } from '../types/ApiError';
import getError from '../utils/getError';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{STRINGS.productPage.title}</title>
      </Helmet>
      <Row>
        <Col md={6}>
          <img className="large" src={product!.image} alt={product!.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product!.name}</title>
              </Helmet>
              <h1>{product!.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product!.rating}
                numReviews={product!.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              {`${STRINGS.productPage.price} ${product!.price}`}
            </ListGroup.Item>
            <ListGroup.Item>
              {STRINGS.productPage.description}
              <p>{product!.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.productPage.price}</Col>
                    <Col>${product!.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.productPage.status.title}</Col>
                    <Col>
                      {product!.countInStock > 0 ? (
                        <Badge bg="success">
                          {STRINGS.productPage.status.inStock}
                        </Badge>
                      ) : (
                        <Badge bg="danger">
                          {STRINGS.productPage.status.unavailable}
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product!.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">
                        {STRINGS.productPage.addToCart}
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
