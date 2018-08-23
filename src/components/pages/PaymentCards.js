import React, {PureComponent} from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import {Row, Col, Button, Form, FormGroup, Label, Input, CustomInput} from 'reactstrap';
import Footer from '../footer/Footer'

class PaymentCards extends PureComponent {

  handleSubmitClick = () => {
    ReactPixel.track('event', {
      category: 'PaymentCard',
      action: 'summit',
      label: 'Summit Button'
    }) 		// For tracking default events, more info about events and data https://developers.facebook.com/docs/ads-for-websites/pixel-events/v2.9
    // ReactPixel.trackCustom( event, data )
    ReactGA.event({
      category: 'PaymentCard',
      action: 'summit',
      label: 'Summit Button'
    });
  }

  render() {
    return (
      <Row>
        <Col>
          <Form>
            <FormGroup row>
              <Col>
                <Input type="text" name="name" placeholder="Card Number"/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Input type="text" name="postCode" placeholder="Post Code"/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={7}>
                <Input type="text" name="expire" placeholder="Expire"/>
              </Col>
              <Col md={5}><Input type="text" name="cvc" placeholder="CVC"/></Col>
            </FormGroup>

            <FormGroup check row>
              <Col className="text-center">
                <Button type="button" onClick={this.handleSubmitClick}>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
          <Footer to="/success"/>
        </Col>
      </Row>
    );
  }
}

export default PaymentCards;