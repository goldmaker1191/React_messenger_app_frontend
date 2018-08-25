import React, {PureComponent} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {Col, Row} from 'reactstrap';
import PaymentStripeRequestForm from '../stripe/StripeForm'
import {STRIPE_KEY} from "../../constanst";
class PaymentCards extends PureComponent {
  render() {
    return (
      <Row>
        <Col className="payment-cards">
          <StripeProvider apiKey={STRIPE_KEY}>
            <Elements>
              <PaymentStripeRequestForm {...this.props}/>
            </Elements>
          </StripeProvider>
        </Col>
      </Row>
    );
  }
}

export default PaymentCards;