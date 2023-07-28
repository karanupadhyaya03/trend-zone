import { Col, Row } from 'react-bootstrap';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';

const CheckoutSteps = (props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) => {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>
        {STRINGS.checkoutSteps.signIn}
      </Col>
      <Col className={props.step2 ? 'active' : ''}>
        {STRINGS.checkoutSteps.shipping}
      </Col>
      <Col className={props.step3 ? 'active' : ''}>
        {STRINGS.checkoutSteps.payment}
      </Col>
      <Col className={props.step4 ? 'active' : ''}>
        {STRINGS.checkoutSteps.placeOrder}
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
