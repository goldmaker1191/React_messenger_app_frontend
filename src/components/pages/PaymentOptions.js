import React, {PureComponent} from 'react';
import ReactGA from 'react-ga';
import {Button, Col, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {PAYMENT_TYPE} from '../../constanst'
import PaypalExpressBtn from '../paypal/PaypalButton'
import PaymentCards from './PaymentCards'
import Footer from '../footer/Footer'

class PaymentOptions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: null,
    }
  }

  handleOnCheckClick = () => {
    ReactGA.event({
      category: 'button',
      action: 'check',
      label: 'Check Button'
    });
  }

  handleOnRadioChange = (value) => {
    this.setState({
      paymentType: value
    })
  }

  handleTrackEvent = () => {
    const {paymentType} = this.state;
    this.props.trackEvent({
      category: `Payment by ${paymentType}`,
      action: 'summit',
      label: 'Summit Button'
    });
  };


  renderBtnPaypal() {
    const onSuccess = (payment) => {
      console.log("Your payment was succeeded!", payment);
      this.handleTrackEvent();
      window.location.href = '/success';
    }
    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('You have cancelled the payment!', data);
    }
    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
    }
    let currency = 'USD'; // or you can set this value from your props or state
    let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    return (
      <PaypalExpressBtn
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }

  render() {
    const {paymentType} = this.state;
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
              <div className="paymenttype-wrapper">
                <CustomInput type="radio" name="paymentType"
                             style={{marginRight: 20}}
                             id="paymentTypeCard"
                             checked={paymentType === PAYMENT_TYPE.CARD}
                             value={PAYMENT_TYPE.CARD}
                             onChange={() => this.handleOnRadioChange(PAYMENT_TYPE.CARD)} label="Card"/>
                <CustomInput type="radio" name="paymentType" value={PAYMENT_TYPE.PAYPAL}
                             id="paymentTypePaypal"
                             checked={paymentType === PAYMENT_TYPE.PAYPAL}
                             onChange={() => this.handleOnRadioChange(PAYMENT_TYPE.PAYPAL)}
                             label="Paypal"/>
              </div>
            </FormGroup>
            <div style={{textAlign: 'center'}}>
              {/*{paymentType === PAYMENT_TYPE.PAYPAL && this.renderBtnPaypal()}*/}
            </div>
            {paymentType === PAYMENT_TYPE.CARD && <PaymentCards {...this.props}/>}
          </Form>
        </Col>
        <Footer to="/cards" showCookieMsg/>
      </Row>
    );
  }
}

export default PaymentOptions;