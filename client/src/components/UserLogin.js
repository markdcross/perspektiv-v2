import React, { useEffect, useContext, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavDesktopM from './NavDesktopM';
import { useMediaQuery } from 'react-responsive';

// user auth
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth-v2/authContext';
import Alerts from './Alerts';
import { useHistory } from 'react-router-dom';

export default function UserLogin(props) {
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
  
	//set position of page slide when in mobile view
	useEffect(() => {
		let top = 0;
		const topCall = props.topCall;
		topCall(top);
	}, []);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

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
    <>
      <Desktop>
        <NavDesktopM />
      </Desktop>
      <Row className="pt-5 bigScroll">
        <Col className="text-center px-5">
          <h2>SIGN IN</h2>
          {/* if there IS an error, then display the error here in the Alerts element */}
          <Alerts />
          <Form className="text-left" onSubmit={onSubmit}>
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
                required
              />
            </Form.Group>
            <Button
              variant="warning"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
          <a className="clearfix" href="/">
            Forgot your password?
          </a>
          <Link to="/register">
            <Button variant="secondary" type="submit" className="w-75 mt-4">
              Don't have an account? Sign up.
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}
