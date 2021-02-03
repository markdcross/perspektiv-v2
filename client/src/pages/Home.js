import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Mapbucket from '../components/Mapbucket';
import UserLogin from '../components/UserLogin';
import UserCreateAcct from '../components/UserCreateAcct';
import ScrollContent from '../components/ScrollContent';
import MuralContent from '../components/MuralContent';
import RestaurantContent from '../components/RestaurantContent';
import NavMobile from '../components/NavMobile';
import { useMediaQuery } from 'react-responsive';
import Sheet from 'react-modal-sheet';
import AuthContext from '../context/auth-v2/authContext';

function Home() {
  const authContext = useContext(AuthContext);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  const [isOpen, setOpen] = useState(false);

  let { path } = useRouteMatch();

  // Screensize detection for mobile view

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    // if there is a current user, load their information in state
    authContext.loadUser();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // eslint-disable-next-line
  }, []);

  return (
    <Row>
      <Col md={7} className="mapSpace p-0">
        <Mapbucket />
      </Col>
      <Col md={5}>
        <Mobile>
          <Sheet
            isOpen={true}
            onClose={() => setOpen(false)}
            snapPoints={[windowDimensions.height, 250, 108]}
            initialSnap={1}
            onSnap={(snapIndex) =>
              console.log('> Current snap point index:', snapIndex)
            }
            className="sheetZfix"
          >
            <NavMobile />
            <Sheet.Container>
              <Sheet.Header></Sheet.Header>
              <Sheet.Content>
                <Switch>
                  <Route path="/login">
                    <UserLogin />
                  </Route>
                  <Route path="/register">
                    <UserCreateAcct />
                  </Route>
                  <Route exact path={path}>
                    <ScrollContent />
                  </Route>
                  <Route path="/murals/:artId">
                    <MuralContent />
                  </Route>
                  <Route path="/restaurants/:restId">
                    <RestaurantContent />
                  </Route>
                </Switch>
              </Sheet.Content>
            </Sheet.Container>
          </Sheet>
        </Mobile>
        <Desktop>
          <Switch>
            <Route path="/login">
              <UserLogin />
            </Route>
            <Route path="/register">
              <UserCreateAcct />
            </Route>
            <Route exact path={path}>
              <ScrollContent />
            </Route>
            <Route path="/murals/:artId">
              <MuralContent />
            </Route>
            <Route path="/restaurants/:restId">
              <RestaurantContent />
            </Route>
          </Switch>
        </Desktop>
      </Col>
    </Row>
  );
}

export default Home;
