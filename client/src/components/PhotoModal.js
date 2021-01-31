import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import ImageUp from "./ImageUp";
import { Icon } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';

export default function PhotoModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          Post a photo of yourself at the mural!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Icon name="image" size="massive" color="pink"/>
          <ImageUp />
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Say something!</Form.Label>
                  <Form.Control type="text" placeholder="..." />
                    <Form.Text className="text-muted">
                    You have 150 characters, make them count!
                    </Form.Text>
                </Form.Group>
              <Button onClick={props.onHide} variant="warning">Submit</Button>
              </Form>
              {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}