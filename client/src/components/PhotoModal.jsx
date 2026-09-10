import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

export default function PhotoModal(props) {
  // if the user is not logged in, then clicking on the post photo button should take them to the /login page
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  function submitForm(muralId, contentType, data, setResponse) {
    axios({
      url: `/api/v1/murals/${muralId}/posts`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': contentType
      }
    })
      .then(response => {
        setResponse(response.data);
        props.refreshState();
      })
      .catch(error => {
        setResponse('error');
      });
  }

  function uploadWithFormData() {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('file', file);

    submitForm(
      props.singleMuralState.data.data._id,
      'multipart/form-data',
      formData,
      msg => console.log(msg)
    );
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter' className='text-center'>
          Post a photo of yourself at the mural!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <Icon name='image' size='massive' color='pink' />
        {/* <ImageUp /> */}
        <Form>
          <Form.Group controlId='formPhotoSubmit'>
            <Form.File
              type='file'
              name='file'
              onChange={e => setFile(e.target.files[0])}
            />
            <Form.Label>Say something!</Form.Label>
            <Form.Control
              type='text'
              placeholder='...'
              value={text}
              onChange={e => {
                setText(e.target.value);
              }}
            />
            <Form.Text className='text-muted'>
              You have 150 characters, make them count!
            </Form.Text>
          </Form.Group>
          <Button onClick={uploadWithFormData} variant='warning'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
