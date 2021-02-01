import React, { useState, useEffect } from 'react';
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

export default function MuralContent(props) {
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
    muralsAPI.getMural(artId).then(data => {
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

  return (
    <>
      <Desktop>
        <NavDesktopM />
      </Desktop>
      <Row className='pt-2 bigScroll'>
        {!singleMuralState.data ? (
          <div>Loading...</div>
        ) : (
          <Col>
            <Mobile>
              <Row className='px-3'>
                <Col className='pb-2'>
                  {/* <Link to='/' onClick={resetNav}> */}
                  <Link to='/'>
                    <Button content='Back' />
                  </Link>
                </Col>
                <Col className='text-right pb-2'>
                  <Button color='yellow' onClick={() => setModalShow(true)}>
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
                <Col className='pb-2'>
                  {/* <Link to='/' onClick={resetNav}> */}
                  <Link to='/'>
                    <Button content='Back' />
                  </Link>
                </Col>
                <Col className='text-right pb-2'>
                  <Button color='yellow' onClick={() => setModalShow(true)}>
                    Post Photo
                  </Button>
                  <PhotoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              </Row>
            </Desktop>
            <Row className='sideImgBox'>
              <Col className='p-0'>
                <Image
                  className='img-fluid w-100'
                  src={`../../muralImages/${singleMuralState.data.data.imageFile}`}
                />
              </Col>
            </Row>
            <Mobile>
              <Row className='mb-4 pt-1 px-3'>
                <Col xs={2} className='my-auto'>
                  <Checkbox label='VISITED' />
                </Col>
                <Col xs={5} className='text-right'>
                  <Button
                    size='mini'
                    color='yellow'
                    content='Distance'
                    icon='location arrow'
                    label={{
                      basic: true,
                      color: 'yellow',
                      pointing: 'left',
                      content: '2,048'
                    }}
                  />
                </Col>
                <Col xs={5} className='text-right'>
                  <Button
                    size='mini'
                    content='Visits'
                    icon='street view'
                    label={{
                      as: 'a',
                      basic: true,
                      pointing: 'left',
                      content: singleMuralState.data.data.__v
                    }}
                  />
                </Col>
              </Row>
            </Mobile>

            <Desktop>
              <Row className='mb-4 pt-1'>
                <Col xs={2} className='my-auto'>
                  <Checkbox label='VISITED' />
                </Col>
                <Col xs={5} className='text-right'>
                  <Button
                    size='mini'
                    color='yellow'
                    content='Distance'
                    icon='location arrow'
                    label={{
                      basic: true,
                      color: 'yellow',
                      pointing: 'left',
                      content: '2,048'
                    }}
                  />
                </Col>
                <Col xs={5} className='text-right'>
                  <Button
                    size='mini'
                    content='Visits'
                    icon='street view'
                    label={{
                      as: 'a',
                      basic: true,
                      pointing: 'left',
                      content: singleMuralState.data.data.__v
                    }}
                  />
                </Col>
              </Row>
            </Desktop>
            <Mobile>
              <Row className='px-3'>
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
            <Row className='h-100 w-100 mx-0'>
              <Col className='p-0'>
                <Row className='pt-2'>
                  <Col className='pr-1 text-right'>
                    {pageInd ? (
                      <Button
                        size='mini'
                        color='yellow'
                        compact
                        floated='right'
                      />
                    ) : (
                      <Button
                        size='mini'
                        color='yellow'
                        compact
                        floated='right'
                        disabled
                      />
                    )}
                  </Col>
                  <Col className='pl-1 text-left'>
                    {pageInd ? (
                      <Button
                        size='mini'
                        color='yellow'
                        compact
                        floated='left'
                        disabled
                      />
                    ) : (
                      <Button
                        size='mini'
                        color='yellow'
                        compact
                        floated='left'
                      />
                    )}
                  </Col>
                </Row>
                <Carousel
                  interval={10000000}
                  wrap={false}
                  onClick={pageIndicate}
                  nextIcon={
                    <Icon name='dot circle outline' color='pink' size='huge' />
                  }
                  prevIcon={
                    <Icon name='dot circle outline' color='pink' size='huge' />
                  }
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
