import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PollAge from '../modals/pollAge';

export const Age = () =>
{
  return (
    <Row>
      <Col>
        <p>Age: 13</p>
      </Col>
      <Col>
        <PollAge />
      </Col>
    </Row>
  )
}