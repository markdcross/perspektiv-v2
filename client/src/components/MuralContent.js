import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Image, Carousel } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import MuralUserContent from './MuralUserContent';
import NavDesktopM from './NavDesktopM';
import RestaurantList from './RestaurantList';
// import DistanceButton from "./DistanceButton";
import muralsAPI from '../utils/murals-API';
import PhotoModal from './PhotoModal';
import { useMediaQuery } from 'react-responsive';
import { SRLWrapper } from 'simple-react-lightbox';
import { useHistory } from 'react-router-dom';
import DistanceButton from './DistanceButton';

// auth context
import AuthContext from '../context/auth-v2/authContext.js';

export default function MuralContent(props) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;
  const history = useHistory();

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

  const { artId } = useParams();

  const [singleMuralState, setSingleMuralState] = useState([]);

  useEffect(() => {
    muralsAPI.getMural(artId).then((data) => {
      setSingleMuralState(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pageInd, setPageInd] = useState(true);

  // const setMNav = props.setDesktopMNav;
  // setMNav(true);

  // function resetNav() {
  // 	setMNav(false);
  // }

  function pageIndicate() {
    if (pageInd) {
      setPageInd(false);
    } else {
      setPageInd(true);
    }
  }

  const [modalShow, setModalShow] = useState(false);

  const options = {
    settings: {
      overlayColor: 'rgba(255, 105, 180, 0.8)',
      autoplaySpeed: 0,
      transitionSpeed: 900,
      disableKeyboardControls: true,
      disablePanzoom: false,
      disableWheelControls: true
    },
    buttons: {
      showAutoplayButton: false,
      showCloseButton: false,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: false,
      showPrevButton: false,
      showThumbnailsButton: false
    },
    caption: {
      captionColor: '#000000',
      captionFontFamily: 'Raleway, sans-serif',
      captionFontWeight: '300',
      captionTextTransform: 'uppercase'
    },
    thumbnails: {
      showThumbnails: false
    }
  };

  const [index, setIndex] = useState(0);
  const localSelect = () => {
    setIndex(0);
  };

  const foodSelect = () => {
    setIndex(1);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [visitedState, setVisitedState] = useState(false);

  // function that handles when a user clicks the visited checkbox for a mural
  const visitMural = async () => {
    muralsAPI.visitMural(artId, user.data._id);
    return setVisitedState(true);
  };
  console.log(visitedState);

  return (
    <>
      <Desktop>
        <NavDesktopM />
      </Desktop>
      <Row className="pt-2 bigScroll">
        {!singleMuralState.data ? (
          <div>Loading...</div>
        ) : (
          <Col>
            <Mobile>
              <Row className="px-3">
                <Col className="pb-2">
                  {/* <Link to='/' onClick={resetNav}> */}
                  <Link to="/">
                    <Button content="Back" />
                  </Link>
                </Col>
                <Col className="text-right pb-2">
                  {/* if the user is not logged in, then clicking on the post photo button below SHOULD take them to the /login page */}
                  <Button
                    color="yellow"
                    onClick={() => {
                      isAuthenticated
                        ? setModalShow(true)
                        : history.push('/login');
                    }}
                  >
                    Post Photo
                  </Button>
                  <PhotoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
            </Mobile>
            <Desktop>
              <Row>
                <Col className="pb-2">
                  {/* <Link to='/' onClick={resetNav}> */}
                  <Link to="/">
                    <Button content="Back" />
                  </Link>
                </Col>
                <Col className="text-right pb-2">
                  <Button
                    color="yellow"
                    onClick={() => {
                      isAuthenticated
                        ? setModalShow(true)
                        : history.push('/login');
                    }}
                  >
                    Post Photo
                  </Button>
                  <PhotoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
            </Desktop>
            <Row className="sideImgBox">
              <Col className="p-0">
                <SRLWrapper options={options}>
                  <Image
                    className="img-fluid w-100"
                    src={`../../muralImages/${singleMuralState.data.data.imageFile}`}
                    alt={singleMuralState.data.data.description}
                  />
                </SRLWrapper>
              </Col>
            </Row>
            <Mobile>
              <Row className="mb-4 pt-1 px-3">
                <Col xs={2} className="my-auto">
                  {isAuthenticated ? (
                    <Checkbox
                      label="VISITED"
                      onChange={visitMural}
                      checked={visitedState}
                    />
                  ) : (
                    <div
                      data-tooltip="Login to track visits"
                      data-position="right center"
                    >
                      <Checkbox label="VISITED" disabled />
                    </div>
                  )}
                </Col>
                <Col xs={5} className="text-right">
                  <DistanceButton
                    location={singleMuralState.data.data.location.coordinates}
                  />
                  {/* <Button
										size='mini'
										color='yellow'
										content='Distance'
										icon='location arrow'
										label={{
											basic: true,
											color: "yellow",
											pointing: "left",
											content: "2,048",
										}}
									/> */}
                </Col>
                <Col xs={5} className="text-right">
                  <Button
                    size="mini"
                    content="Visits"
                    icon="street view"
                    label={{
                      as: 'a',
                      basic: true,
                      pointing: 'left',
                      content: singleMuralState.data.data.visits.length
                    }}
                  />
                </Col>
              </Row>
            </Mobile>
            <Desktop>
              <Row className="mb-4 pt-1">
                <Col xs={2} className="my-auto">
                  {isAuthenticated ? (
                    <Checkbox
                      label="VISITED"
                      onChange={visitMural}
                      checked={visitedState}
                    />
                  ) : (
                    <div
                      data-tooltip="Login to track visits"
                      data-position="right center"
                    >
                      <Checkbox label="VISITED" disabled />
                    </div>
                  )}
                </Col>
                <Col xs={5} className="text-right">
                  <DistanceButton
                    location={singleMuralState.data.data.location.coordinates}
                  />
                </Col>
                <Col xs={5} className="text-right">
                  <Button
                    size="mini"
                    content="Visits"
                    icon="street view"
                    label={{
                      as: 'a',
                      basic: true,
                      pointing: 'left',
                      content: singleMuralState.data.data.visits.length
                    }}
                  />
                </Col>
              </Row>
            </Desktop>
            <Mobile>
              <Row className="px-3">
                <Col>
                  <p>
                    ARTIST:{' '}
                    {!singleMuralState.data.data.artist
                      ? 'No available info'
                      : singleMuralState.data.data.artist.name}
                  </p>
                  <p>TITLE: {singleMuralState.data.data.name}</p>
                  <p>LOCATION: {singleMuralState.data.data.address}</p>
                </Col>
              </Row>
            </Mobile>
            <Desktop>
              <Row>
                <Col>
                  <p>
                    ARTIST:{' '}
                    {!singleMuralState.data.data.artist
                      ? 'No available info'
                      : singleMuralState.data.data.artist.name}
                  </p>
                  <p>TITLE: {singleMuralState.data.data.name}</p>
                  <p>LOCATION: {singleMuralState.data.data.address}</p>
                </Col>
              </Row>
            </Desktop>
            <Row className="h-100 w-100 mx-0">
              <Col className="p-0">
                <Row className="pt-2">
                  <Col className="pr-1 text-right">
                    {pageInd ? (
                      <Button
                        size="small"
                        color="yellow"
                        compact
                        floated="right"
                        className="w-75"
                        content="Locals!"
                      />
                    ) : (
                      <Button
                        size="small"
                        color="grey"
                        compact
                        floated="right"
                        className="w-75"
                        content="Locals!"
                        onClick={localSelect}
                      />
                    )}
                  </Col>
                  <Col className="pl-1 text-left">
                    {pageInd ? (
                      <Button
                        size="small"
                        color="grey"
                        compact
                        floated="left"
                        className="w-75"
                        content="Get Food!"
                        onClick={foodSelect}
                      />
                    ) : (
                      <Button
                        size="small"
                        color="yellow"
                        compact
                        floated="left"
                        content="Get Food!"
                        className="w-75"
                      />
                    )}
                  </Col>
                </Row>
                <Carousel
                  activeIndex={index}
                  onSelect={handleSelect}
                  touch={true}
                  interval={10000000}
                  wrap={false}
                  onSlide={pageIndicate}
                  nextIcon={<Icon name="angle right" size="huge" />}
                  prevIcon={<Icon name="angle left" size="huge" />}
                >
                  <Carousel.Item>
                    <MuralUserContent />
                  </Carousel.Item>
                  <Carousel.Item>
                    <RestaurantList />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
}
