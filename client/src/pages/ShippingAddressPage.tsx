import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';

const ShippingAddressPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });

    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    );

    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>{STRINGS.shippingAddressPage.title}</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1>{STRINGS.shippingAddressPage.title}</h1>
        <Form className="my-3" onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>
              {STRINGS.shippingAddressPage.labels.fullName}
            </Form.Label>
            <Form.Control
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>
              {STRINGS.shippingAddressPage.labels.address}
            </Form.Label>
            <Form.Control
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>{STRINGS.shippingAddressPage.labels.city}</Form.Label>
            <Form.Control
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>
              {STRINGS.shippingAddressPage.labels.postalCode}
            </Form.Label>
            <Form.Control
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>
              {STRINGS.shippingAddressPage.labels.country}
            </Form.Label>
            <Form.Control
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="primary">
              {STRINGS.shippingAddressPage.submitButton}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
