import React, {PureComponent} from 'react';
import {Col, Row} from 'reactstrap';
import PaymentStripeRequestForm from '../stripe/StripeForm'

class PaymentCards extends PureComponent {
  render() {
    return (
      <Row>
        <Col className="payment-cards">
          <PaymentStripeRequestForm {...this.props}/>
        </Col>
      </Row>
    );
  }
}

export default PaymentCards;