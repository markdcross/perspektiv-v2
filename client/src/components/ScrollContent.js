import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import {
  Button,
  Checkbox,
} from 'semantic-ui-react';
import { Link } from "react-router-dom";
import muralsAPI from '../utils/murals-API';

export default function ScrollContent() {
  const [muralState, setMuralState] = useState([]);

  useEffect(() => {
    muralsAPI.getMurals().then((data) => {
      setMuralState(data);
    });
  }, []);


  return (
    <Row>
      {!muralState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className="scrollButt">
          {muralState.data.data.map((mural) => {
            return (
              <div>
                <Row className="sideImgBox">
                  <Col className="p-0 parent">
                    <Link to={"/murals/" + mural.id}>
                      <Image
                        className="img-fluid w-100 inner"
                        src={mural.image}
                      />
                    </Link>
                  </Col>
                </Row>
                <Row className="mb-4 pt-1">
                  <Col xs={2} className="my-auto">
                    <Checkbox label="VISITED" />
                  </Col>
                  <Col xs={5} className="text-right">
                    <Button
                      size="mini"
                      color="yellow"
                      content="Distance"
                      icon="location arrow"
                      label={{
                        basic: true,
                        color: 'yellow',
                        pointing: 'left',
                        content: '2,048'
                      }}
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
