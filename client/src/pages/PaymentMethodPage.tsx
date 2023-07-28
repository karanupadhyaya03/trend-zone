import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });

    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>{STRINGS.paymentMethodPage.title}</title>
        </Helmet>
        <h1 className="my-3">{STRINGS.paymentMethodPage.title}</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">
              {STRINGS.paymentMethodPage.submitButton}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
