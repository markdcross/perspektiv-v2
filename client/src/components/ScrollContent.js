import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Checkbox } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MuralContext from '../utils/MuralContext';
import DistanceButton from './DistanceButton';

export default function ScrollContent() {
  const muralState = useContext(MuralContext);

  return (
    <Row>
      {!muralState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className='scrollButt'>
          {muralState.data.data.map(mural => {
            return (
              <div key={mural.id}>
                <Row className='sideImgBox'>
                  <Col className='p-0 parent'>
                    <Link to={'/murals/' + mural.id}>
                      <Image
                        className='img-fluid w-100 inner'
                        src={mural.image}
                      />
                    </Link>
                  </Col>
                </Row>
                <Row className='mb-4 pt-1'>
                  <Col xs={2} className='my-auto'>
                    <Checkbox label='VISITED' />
                  </Col>
                  <Col xs={5} className='text-right'>
                    <DistanceButton location={mural.location.coordinates} />
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
                        content: mural.__v
                      }}
                    />
                  </Col>
                </Row>
              </div>
            );
          })}
        </Col>
      )}
    </Row>
  );
}
