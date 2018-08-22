import React, { PureComponent } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, CustomInput, InputGroupAddon, InputGroup } from 'reactstrap';
import Footer from '../footer/Footer'

class PaymentOptions extends PureComponent {
  render() {
    return (
      <Row>
        <Col>
          <Form>
              <FormGroup row>
                <Col>
                  <InputGroup>
                    <Input type="text" name="name" placeholder="Name" />                  
                    <InputGroupAddon addonType="append">
                      <Button type="button" color="secondary">Check</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <div>
                  <CustomInput type="radio" name="paymentType" label="Card" />
                  <CustomInput type="radio" name="paymentType" label="Paypal" />
                </div>
              </FormGroup>
              <FormGroup check row>
                <Col className="text-center">
                  <Button type="button">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
            <Footer to="/cards"/>
        </Col>
      </Row> 
    );
  }
}

export default PaymentOptions;