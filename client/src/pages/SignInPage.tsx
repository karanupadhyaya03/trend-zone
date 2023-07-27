import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { useSignInMutation } from '../hooks/userHooks';
import getError from '../utils/getError';
import { ApiError } from '../types/ApiError';
import { toast } from 'react-toastify';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import LoadingBox from '../components/LoadingBox';

const SignInPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isLoading } = useSignInMutation();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signin({
        email,
        password,
      });

      dispatch({ type: 'USER_SIGN_IN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>{STRINGS.signInPage.title}</title>
      </Helmet>
      <h1 className="my-3">{STRINGS.signInPage.title}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>{STRINGS.signInPage.labels.email}</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{STRINGS.signInPage.labels.password}</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            {STRINGS.signInPage.title}
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        <div className="mb-3">
          {STRINGS.signInPage.labels.newCustomer}{' '}
          <Link to={`/signup?redirect=${redirect}`}>
            {STRINGS.signInPage.labels.createAccount}
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
