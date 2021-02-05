import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import NavDesktopM from './NavDesktopM';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth-v2/authContext';
import Alerts from './Alerts';

export default function UserCreateAcct(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
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

  const setTop = props.setTopSnap;
	setTop(0);
  
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  return (
    <>
      <Desktop>
        <NavDesktopM />
      </Desktop>
      <Row className="pt-5 bigScroll">
        <Col className="text-center px-5">
          <h2>CREATE AN ACCOUNT</h2>
          {/* if there IS an error, then display the error here in the Alerts element */}
          <Alerts />
          <Form className="text-left" onSubmit={onSubmit}>
            <Form.Group controlId="formUserName" id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter Name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
              <Form.Text className="text-muted" />
            </Form.Group>
            <Form.Group controlId="formUserEmail" id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <Form.Text className="text-muted" />
            </Form.Group>
            <Form.Group controlId="formUserPassword" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formUserConfirmPassword"
              id="passwordConfirm"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                minLength="6"
                required
              />
            </Form.Group>
            <Button
              variant="warning"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              CREATE ACCOUNT!
            </Button>
          </Form>
          <Link to="/login">
            <Button variant="secondary" type="submit" className="w-75 mt-4">
              Already have an account? Sign in.
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}
