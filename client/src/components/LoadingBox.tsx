import { Spinner } from 'react-bootstrap';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';

const LoadingBox = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{STRINGS.homePage.loading}</span>
    </Spinner>
  );
};

export default LoadingBox;
