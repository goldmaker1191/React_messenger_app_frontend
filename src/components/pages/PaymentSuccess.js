import React, {PureComponent} from 'react';
import {Row, Col, UncontrolledAlert} from 'reactstrap';

class PaymentSuccess extends PureComponent {
  render() {
    return (
      <Row>
        <Col>
          <UncontrolledAlert color="success" className="text-center">
            Payment Success
          </UncontrolledAlert>
        </Col>
      </Row>
    );
  }
}

export default PaymentSuccess;