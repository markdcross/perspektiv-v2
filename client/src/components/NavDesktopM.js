import React, { useContext } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Progress } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

// auth context
import AuthContext from '../context/auth-v2/authContext.js';

export default function NavDesktopM() {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  return (
    <>
      <Row className="fbNav">
        <Col className="pt-2">
          <Link to={'/'}>
            <Image className="w-100" src="/assets/images/logo/plogo.png" />
          </Link>
        </Col>
        <Col className="my-2 respLoginBreakDN fluid">
          <Button
            className="achievementMark px-6 w-100 clearfix"
            color="yellow"
          >
            Explorer
            <div className="achievementMarkCountDN">
              <p className="achievementMarkTextDN">42</p>
            </div>
            <div className="achievementMarkAvatarDN">
              <ReactRoundedImage
                image="/assets/images/avatars/matthew.png"
                roundedColor="#ffffff"
                roundedSize="0"
                imageWidth="40"
                imageHeight="40"
              />
            </div>
          </Button>
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
      <Row className="pt-2 ">
        <Col>
          <Progress
            progress="value"
            value={3}
            total={10}
            active
            color="pink"
            size="small"
          />
        </Col>
      </Row>
    </>
  );
}
