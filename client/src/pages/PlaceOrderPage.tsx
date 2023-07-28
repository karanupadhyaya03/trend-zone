import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { useCreateOrderMutation } from '../hooks/orderHooks';
import { toast } from 'react-toastify';
import getError from '../utils/getError';
import { ApiError } from '../types/ApiError';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const { cart } = state;

  const round2 = (num: number) =>
    Math.round((num * 100 + Number.EPSILON) / 100); // 33.52123 -> 33.42

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

      dispatch({ type: 'CART_CLEAR' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, cart]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>{STRINGS.placeOrderPage.title}</title>
      </Helmet>
      <h1 className="my-3">{STRINGS.placeOrderPage.title}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.shipping}</Card.Title>
              <Card.Text>
                <strong>{STRINGS.placeOrderPage.name}</strong>{' '}
                {cart.shippingAddress.fullName}
                <br />
                <strong>{STRINGS.placeOrderPage.address}</strong>{' '}
                {cart.shippingAddress.address}
                {', '}
                {cart.shippingAddress.city}
                {', '}
                {cart.shippingAddress.postalCode}
                {', '}
                {cart.shippingAddress.country}
                <strong></strong>
              </Card.Text>
              <Link to="/shipping">{STRINGS.placeOrderPage.editButton}</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.payment}</Card.Title>
              <Card.Text>
                <strong>{STRINGS.placeOrderPage.method}</strong>{' '}
                {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">{STRINGS.placeOrderPage.editButton}</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.items}</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-itmes-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded thumbnail"
                        />{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">{STRINGS.placeOrderPage.editButton}</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.orderSummary}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.placeOrderPage.items}</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.placeOrderPage.shipping}</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.placeOrderPage.tax}</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>{STRINGS.placeOrderPage.totalPrice}</strong>
                    </Col>
                    <Col>${cart.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={cart.cartItems.length === 0 || isLoading}
                    >
                      {STRINGS.placeOrderPage.placeOrder}
                    </Button>
                    {isLoading && <LoadingBox />}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
