import React, { useContext } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import MuralContext from '../context/MuralContext';

export default function RestaurnatUserContent() {
  const muralState = useContext(MuralContext);
  return (
    <Row className='pt-2'>
      {!muralState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className='scrollButt'>
          {muralState.data.data.map(mural => {
            return (
              <div key={mural.id}>
                <Row>
                  <Col className='parentMural'>
                    <Image
                      className='innerMural'
                      src={`../../muralImages/${mural.imageFile}`}
                    />
                    <Button
                      className='achievementMarkMural px-6 py-0'
                      color='yellow'
                    >
                      <p className='mb-0'>Master</p>
                      <div className='achievementMarkCountMural'>
                        <p className='achievementMarkTextMural'>999</p>
                      </div>
                      <div className='achievementMarkAvatarMural'>
                        <ReactRoundedImage
                          image='/assets/images/avatars/matthew.png'
                          roundedColor='#ffffff'
                          roundedSize='0'
                          imageWidth='25'
                          imageHeight='25'
                        />
                      </div>
                    </Button>
                  </Col>
                </Row>
                <Row className='pb-3'>
                  <Col>
                    <p>
                      This is a story of a man named Jed. Poor mountaineer
                      hardly kept his family fed. Jelly halvah croissant.
                    </p>
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
