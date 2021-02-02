import React, { useContext } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import MuralContext from '../context/MuralContext';
import { SRLWrapper } from "simple-react-lightbox";

export default function MuralUserContent() {
  const muralState = useContext(MuralContext);

  const options = {
    settings: {
      overlayColor: "rgba(255, 105, 180, 0.8)",
      autoplaySpeed: 0,
      transitionSpeed: 900,
      disableKeyboardControls: true,
      disablePanzoom: false,
      disableWheelControls: true,
    },
    buttons: {
      showAutoplayButton: false,
      showCloseButton: false,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: false,
      showPrevButton: false,
      showThumbnailsButton: false,
    },
    caption: {
      captionColor: "#000000",
      captionFontFamily: "Raleway, sans-serif",
      captionFontWeight: "300",
      captionTextTransform: "uppercase",
    },
    thumbnails: {
      showThumbnails: false,
    }
  };

  return (
    <Row className='pt-2'>
      {!muralState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className='scrollButt'>
          <SRLWrapper options={options}>
          {muralState.data.data.map(mural => {
            return (
              <div key={mural.id}>
                <Row>
                  <Col className='parentMural'>
                    <Image
                      className='innerMural'
                      src={`../../muralImages/${mural.imageFile}`}
                      alt={mural.description}
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
          </SRLWrapper>
        </Col>
      )}
    </Row>
  );
}
