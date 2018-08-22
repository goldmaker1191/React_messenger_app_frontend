import React, { PureComponent } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import Footer from '../footer/Footer'

class PaymentCards extends PureComponent {
  render() {
    return (
      <Row>
        <Col>
          <Form>
              <FormGroup row>
                <Col>
                  <Input type="text" name="name" placeholder="Card Number" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Input type="text" name="postCode" placeholder="Post Code" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={7}>
                  <Input type="text" name="expire" placeholder="Expire" />
                </Col>
                <Col md={5}><Input type="text" name="cvc" placeholder="CVC" /></Col>
              </FormGroup>
              
              <FormGroup check row>
                <Col className="text-center">
                  <Button type="button">Submit</Button>
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