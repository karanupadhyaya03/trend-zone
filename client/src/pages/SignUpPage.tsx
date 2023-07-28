import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { useSignUpMutation } from '../hooks/userHooks';
import { toast } from 'react-toastify';
import getError from '../utils/getError';
import { ApiError } from '../types/ApiError';
import { USER_DISPLAY_STRINGS as STRINGS } from '../resources/user_display_strings';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signup, isLoading } = useSignUpMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error(STRINGS.signUpPage.passwordMismatch);
      return;
    }

    try {
      const data = await signup({
        name,
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

  return (
    <Container className="small-container">
      <Helmet>
        <title>{STRINGS.signUpPage.title}</title>
      </Helmet>
      <h1 className="my-3">{STRINGS.signUpPage.title}</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>{STRINGS.signUpPage.labels.name}</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>{STRINGS.signUpPage.labels.confirmPassword}</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            {STRINGS.signUpPage.title}
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        <div className="mb-3">
          {STRINGS.signUpPage.labels.alreadyHaveAccout}{' '}
          <Link to={`/signin?redirect=${redirect}`}>
            {STRINGS.signInPage.title}
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
