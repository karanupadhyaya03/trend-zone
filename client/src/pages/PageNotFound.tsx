import { Link } from 'react-router-dom';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mt-5">
          <h1>{STRINGS.pageNotFound.title}</h1>
          <p>{STRINGS.pageNotFound.description}</p>
          <Link to="/" className="btn btn-primary">
            {STRINGS.pageNotFound.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
