import React, {PureComponent} from 'react';
import ReactGA from 'react-ga';
import {Button, Col, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import Footer from '../footer/Footer'

class PaymentOptions extends PureComponent {
  constructor(props) {
    super(props);

  }

  handleOnCheckClick = () => {
    ReactGA.event({
      category: 'button',
      action: 'check',
      label: 'Check Button'
    });
  }

  handleSubmitClick = () => {
    this.props.trackEvent({
      category: 'PaymentCard',
      action: 'summit',
      label: 'Summit Button'
    });
  };

  render() {
    return (
      <Row>
        <Col>
          <Form>
            <FormGroup row>
              <Col>
                <InputGroup>
                  <Input type="text" name="name" placeholder="Name"/>
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="secondary" onClick={() => this.handleOnCheckClick()}>Check</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup>
              <div>
                <CustomInput type="radio" name="paymentType" label="Card"/>
                <CustomInput type="radio" name="paymentType" label="Paypal"/>
              </div>
            </FormGroup>
            <FormGroup check row>
              <Col className="text-center">
                <Button type="button" onClick={() => this.handleSubmitClick()}>Submit</Button>
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