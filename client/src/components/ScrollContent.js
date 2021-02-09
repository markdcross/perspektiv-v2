import React, { useContext, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Checkbox } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MuralContext from '../context/MuralContext';
import DistanceButton from './DistanceButton';
import NavDesktop from './NavDesktop';
import { useMediaQuery } from 'react-responsive';
import VisitedCheckbox from './VisitedCheckbox';

// auth context
import AuthContext from '../context/auth-v2/authContext.js';

export default function ScrollContent(props) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;
  //set position of page slide when in mobile view
  useEffect(() => {
    let top = 1;
    const topCall = props.topCall;
    topCall(top);
    // eslint-disable-next-line
  }, []);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  const muralState = useContext(MuralContext);

  return (
    <>
      <Desktop>
        <NavDesktop />
      </Desktop>
      <Row>
        {!muralState.data ? (
          <div>Loading...</div>
        ) : (
          <Col className="scrollButt">
            {muralState.data.data.map((mural) => {
              return (
                <div key={mural.id}>
                  <Row className="sideImgBox">
                    <Col className="p-0 parent">
                      <Link to={'/murals/' + mural.id}>
                        <Image
                          className="img-fluid w-100 inner"
                          loading="lazy"
                          src={`../../muralImages/${mural.imageFile}`}
                        />
                      </Link>
                    </Col>
                  </Row>
                  <Mobile>
                    <Row className="mb-4 pt-1 pl-1">
                      <Col className="ml-0">
                        {isAuthenticated ? (
                          <VisitedCheckbox artId={mural.id} user={user} />
                        ) : (
                          <div
                            data-tooltip="Login to track visits"
                            data-position="right center"
                          >
                            <Checkbox label="VISITED" disabled />
                          </div>
                        )}
                        {/* </Col>
											<Col xs={6} className='text-right'> */}
                        <DistanceButton location={mural.location.coordinates} />
                        {/* </Col>
											<Col xs={4} className='text-right'> */}
                        <Button
                          size="mini"
                          content="  "
                          icon="street view"
                          label={{
                            as: 'a',
                            basic: true,
                            pointing: 'left',
                            content: mural.visits.length
                          }}
                          className="pl-2 pr-3"
                        />
                      </Col>
                    </Row>
                  </Mobile>
                  <Desktop>
                    <Row className="mb-4 pt-1 pl-0">
                      <Col className="ml-0">
                        {isAuthenticated ? (
                          <VisitedCheckbox artId={mural.id} user={user} />
                        ) : (
                          <div
                            data-tooltip="Login to track visits"
                            data-position="right center"
                            className="float-left"
                          >
                            <Checkbox label="VISITED" disabled />
                          </div>
                        )}
                        {/* </Col>
											<Col xs={6} className='text-right'> */}
                        <DistanceButton location={mural.location.coordinates} />
                        {/* </Col>
											<Col xs={4} className='text-right'> */}
                        <Button
                          size="mini"
                          content="Visits"
                          icon="street view"
                          label={{
                            as: 'a',
                            basic: true,
                            pointing: 'left',
                            content: mural.visits.length
                          }}
                          className="pl-2 pr-3"
                        />
                      </Col>
                    </Row>
                  </Desktop>
                </div>
              );
            })}
          </Col>
        )}
      </Row>
    </>
  );
}
