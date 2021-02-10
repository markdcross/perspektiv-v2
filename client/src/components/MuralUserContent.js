import React from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

export default function MuralUserContent({ muralPostState }) {
  return (
    <Row className='pt-2'>
      {!muralPostState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className='scrollButt'>
          {muralPostState.data.data.map(post => {
            return (
              <div key={post.id}>
                <Row>
                  <Col className='parentMural'>
                    <Image
                      className='innerMural'
                      src={`../../uploads/${post.image}`}
                      alt={post.text}
                    />
                    {/* <Button
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
                    </Button> */}
                  </Col>
                </Row>
                <Row className='pb-3'>
                  <Col>
                    <p>{post.text}</p>
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
