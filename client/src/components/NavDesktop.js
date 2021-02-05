import React from 'react';
// import ReactRoundedImage from 'react-rounded-image';
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
      {/* <Row className="respLogin">
        <Col className="d-flex justify-content-center my-2">
          <ReactRoundedImage
            image="/assets/images/avatars/matthew.png"
            roundedColor="#ffffff"
            roundedSize="2"
            imageWidth="100"
            imageHeight="100"
          />
          <Button className="achievementMark my-auto ml-1" color="yellow">
            Explorer
            <div className="achievementMarkCount">
              <p className="achievementMarkText">42</p>
            </div>
          </Button>
        </Col>
      </Row>
      <Row className="pb-2">
        <Col>
          <Progress
            success={false}
            disabled={false}
            progress="value"
            value={3}
            total={10}
            active
            color="pink"
            size="small"
          />
        </Col>
      </Row> */}
    </div>
  );
}
