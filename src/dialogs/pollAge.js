import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AgeForm = (props) =>
{
  const {u, a} = props;
  // TODO - set default u, a if not passed in
  return (
<Form id="pollAge">
  <Form.Group controlId="formUser">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="user" />
  </Form.Group>
  <Form.Group controlId="formAge">
    <Form.Label>Age</Form.Label>
    <Form.Control type="text" placeholder="13" />
  </Form.Group>
  {/* <Button variant="primary" type="submit">
    Submit
  </Button> */}
</Form>
  )
}

const PollAge = (props) =>
{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgeForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="pollAge" key="submit" htmlType="submit" variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default PollAge;