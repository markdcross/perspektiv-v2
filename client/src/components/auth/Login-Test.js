import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth-v2/authContext';
import Alerts from '../Alerts';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error === 'Invalid credentials.') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // set the user state object
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // loading state and method for disabling duplicate submit button clicks
  const [loading, setLoading] = useState(false);
  // destructure the user object
  const { email, password } = user;

  // handle form field changes whenever a user types
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  // handle the form submit
  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please fill out all fields.', 'danger');
    } else {
      console.log('login submit');
      login({ email, password });
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {/* if there IS an error, then display the error here in the Alerts element */}
              <Alerts />
              <Form onSubmit={onSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  ></Form.Control>
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100"
                  value="login"
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account yet? <Link to="/register">Sign up.</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Back <Link to="/">home.</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
