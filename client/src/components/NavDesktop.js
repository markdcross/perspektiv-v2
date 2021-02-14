import React, { useContext } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserStatus from "./UserStatus"
import LogoutBtn from './LogoutBtn';


// auth context
import AuthContext from '../context/auth-v2/authContext.js';

export default function NavDesktop() {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  return (
    <div>
      <Row>
        <Col className="pt-2">
          <Link to={'/'}>
            <Image className="w-100" src="/assets/images/logo/plogo.png" />
          </Link>
        </Col>
        {isAuthenticated ? (
          <LogoutBtn />
        ) : (
          <Col className="text-right pt-2">
            <Link to="/login">
              <Button content="LOGIN" basic />
            </Link>
          </Col>
        )}
      </Row>
      <UserStatus />
    </div>
  );
}
