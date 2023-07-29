import { Link, useParams } from 'react-router-dom';
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from '../hooks/orderHooks';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import getError from '../utils/getError';
import { ApiError } from '../types/ApiError';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useEffect } from 'react';

const OrderPage = () => {
  const params = useParams();
  const { id: orderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const { mutateAsync: payOrder, isLoading: loadingPay } =
    usePayOrderMutation();
  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! });
    refetch();
    toast.success('Payment Successful');
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypalConfig } = useGetPayPalClientIdQuery(); // paypalConfig is the result of keyRouter in backend

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypalConfig.clientId,
            currency: 'USD',
          },
        });

        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      loadPaypalScript();
    }
  }, [paypalConfig, paypalDispatch]);

  const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    async createOrder(_data, actions) {
      const orderId = await actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order!.totalPrice.toString(),
            },
          },
        ],
      });
      return orderId;
    },
    async onApprove(_data, actions) {
      const details = await actions.order!.capture();
      try {
        await payOrder({ orderId: orderId!, ...details });
        refetch();
        toast.success('Payment Successful');
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

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
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant="danger">
                        {STRINGS.orderPage.payment.payPalError}
                      </MessageBox>
                    ) : (
                      <div>
                        <PayPalButtons
                          {...paypalButtonTransactionProps}
                        ></PayPalButtons>
                        <Button onClick={testPayHandler}>
                          {STRINGS.orderPage.payment.testPay}
                        </Button>
                      </div>
                    )}
                    {loadingPay && <LoadingBox />}
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

export default OrderPage;
