import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image
 } from 'react-bootstrap';
 import { Button, Checkbox } from 'semantic-ui-react';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Mapbucket from "../components/Mapbucket";
import ScrollContent from "../components/ScrollContent";
import MuralContent from "../components/MuralContent";
import RestaurantContent from "../components/RestaurantContent";
import NavDesktop from "../components/NavDesktop";
import NavDesktopM from "../components/NavDesktopM";
import NavMobile from "../components/NavMobile";
import { useMediaQuery } from 'react-responsive'
import Sheet from 'react-modal-sheet';
import { motion } from "framer-motion";
// import * as muralData from "./data/murals.json";


function Home() {

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return isDesktop ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }

  const [desktopMNav, setDesktopMNav] = useState(false);

  const [isOpen, setOpen] = useState(false);

    let { path, url } = useRouteMatch();

  return (
      // <div>
      //   <Container fluid>
          <Row>
            <Col md={7} className="mapSpace p-0">
              <Mapbucket />
            </Col>
            <Col md={5}>

              <Mobile>
                <Sheet 
                  isOpen={true}
                  onClose={() => setOpen(false)}
                  snapPoints={[600, 400, 90]}
                  initialSnap={2}
                  onSnap={snapIndex =>
                    console.log('> Current snap point index:', snapIndex)
                  }
                  className="sheetZfix"
                  >
                  <NavMobile />
                  <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                      <ScrollContent />                      
                    </Sheet.Content>
                  </Sheet.Container>
                </Sheet>
              </Mobile>

              
              <Desktop>
              {desktopMNav ? <NavDesktopM /> : <NavDesktop />}
              {/* <NavDesktop /> */}
              </Desktop>
              <Desktop>
                <Switch>
                  <Route exact path={path}>
                    <ScrollContent />
                  </Route>
                  <Route path="/murals/:artId">
                    <MuralContent desktopMNav={desktopMNav} setDesktopMNav={setDesktopMNav}/>
                  </Route>
                  <Route path="/restaurants">
                    <RestaurantContent desktopMNav={desktopMNav} setDesktopMNav={setDesktopMNav}/>
                  </Route>
                </Switch>
                {/* <ScrollContent /> */}
                {/* <MuralContent /> */}
              </Desktop>
            </Col>
          </Row>
      //   </Container>
      // </div>
  );
}

export default Home;