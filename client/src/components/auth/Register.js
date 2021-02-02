import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth-v2/authContext';
import Alerts from '../Alerts';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists.') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // set the user state object
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // loading state and method for disabling duplicate submit button clicks
  const [loading, setLoading] = useState(false);
  // destructure the user object
  const { name, email, password, password2 } = user;

  // handle form field changes whenever a user types
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  // handle the form submit
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please fill out all fields.', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match.', 'danger');
    } else {
      console.log('register submit');
      register({ name, email, password });
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
              <h2 className="text-center mb-4">Sign Up</h2>
              {/* if there IS an error, then display the error here in the Alerts element */}
              <Alerts />
              <Form onSubmit={onSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  ></Form.Control>
                </Form.Group>
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
                    minLength="6"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="passwordConfirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    minLength="6"
                    required
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  value="register"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in.</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Back <Link to="/">home.</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
