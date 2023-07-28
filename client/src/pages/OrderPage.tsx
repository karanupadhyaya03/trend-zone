import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../hooks/orderHooks';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import getError from '../utils/getError';
import { ApiError } from '../types/ApiError';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import { Helmet } from 'react-helmet-async';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const OrderPage = () => {
  const params = useParams();
  const { id: orderId } = params;

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">{STRINGS.orderPage.notFound}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{STRINGS.orderPage.title}</title>
      </Helmet>
      <h1 className="my-3">{STRINGS.orderPage.title}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.shipping}</Card.Title>
              <Card.Text>
                <strong>{STRINGS.placeOrderPage.name}</strong>{' '}
                {order.shippingAddress.fullName}
                <br />
                <strong>{STRINGS.placeOrderPage.address}</strong>{' '}
                {order.shippingAddress.address}
                {', '}
                {order.shippingAddress.city}
                {', '}
                {order.shippingAddress.postalCode}
                {', '}
                {order.shippingAddress.country}
                <strong></strong>
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  {`${STRINGS.orderPage.messages.deliveredAt}${order.deliveredAt}`}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">
                  {STRINGS.orderPage.messages.notDelivered}
                </MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.payment}</Card.Title>
              <Card.Text>
                <strong>{STRINGS.placeOrderPage.method}</strong>{' '}
                {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">{`${STRINGS.orderPage.messages.paidAt} ${order.paidAt}`}</MessageBox>
              ) : (
                <MessageBox variant="warning">
                  {STRINGS.orderPage.messages.notPaid}
                </MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{STRINGS.placeOrderPage.items}</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
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
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.placeOrderPage.shipping}</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>{STRINGS.placeOrderPage.tax}</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>{STRINGS.placeOrderPage.totalPrice}</strong>
                    </Col>
                    <Col>${order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
