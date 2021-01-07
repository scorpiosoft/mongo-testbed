import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import testApi from "../api/testApi";

const AgeForm = (props) =>
{
  const handleChange = event =>
  {
    const { name, value } = event.target;
    if ( name === 'a' )
    {
      props.setAge(value);
    } else {
      props.setUsername(value);
    }
  }
  return (
<Form id="pollAge">
  <Form.Group controlId="formUser">
    <Form.Label>Username</Form.Label>
    <Form.Control
      name='u'
      value={props.username}
      type="text"
      placeholder="user"
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group controlId="formAge">
    <Form.Label>Age</Form.Label>
    <Form.Control
      name='a'
      value={props.age}
      type="number"
      placeholder="13"
      onChange={handleChange}
    />
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
  const [username, setUsername] = useState('user');
  const [age, setAge] = useState(13);

  const handleShow = () =>
  {
    // fetch mongo data
    testApi.getAge().then(res =>
    {
      const d = JSON.stringify(res.data, 2);
      console.log(d);
      // setAge(res.data.age.value)
      // if (res.data.age.)
    }).catch(err => console.log(err));
    // now open dialog
    setShow(true);
  }
  const handleClose = () =>
  {
    // handle mongo data change
    testApi.setAge().then(res =>
    {}).catch(err => console.log(err));
    // now close dialog
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        poll: {age}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgeForm
            username={username}
            setUsername={setUsername}
            age={age}
            setAge={setAge}
          />
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