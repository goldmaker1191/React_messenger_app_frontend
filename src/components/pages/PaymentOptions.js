import React, {PureComponent} from "react";
import ReactGA from "react-ga";
import BlockUi from 'react-block-ui';
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Alert
} from "reactstrap";
import {PAYMENT_TYPE} from "../../constanst";
import PaypalExpressBtn from "../paypal/PaypalButton";
import PaymentCards from "./PaymentCards";
import Footer from "../footer/Footer";
import {sanctionCheck} from "../../appService";
import 'react-block-ui/style.css';

class PaymentOptions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: null,
      messageSanction: "",
      loading: false
    };
    this.sanctionNameRef = null;
  }

  handleOnCheckClick = (e) => {
    ReactGA.event({
      category: "button",
      action: "check-sanction",
      label: "Check Button"
    });
    this.setState({
      messageSanction: "",
      loading: true
    });
    sanctionCheck({surname: this.sanctionNameRef.value}).then(rp => {
      console.log(rp);
      this.setState({
        messageSanction: rp.data,
        loading: false
      });
    }).catch(e => {
      console.log(e);
      this.setState({
        messageSanction: 'ERROR',
        loading: false
      });
    });
  };

  handleOnRadioChange = value => {
    this.setState({
      paymentType: value
    });
  };

  handleTrackEvent = () => {
    const {paymentType} = this.state;
    this.props.trackEvent({
      category: `Payment by ${paymentType}`,
      action: "summit",
      label: "Summit Button"
    });
  };

  renderBtnPaypal() {
    const onSuccess = payment => {
      console.log("Your payment was succeeded!", payment);
      this.handleTrackEvent();
      window.location.href = "/success";
    };
    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("You have cancelled the payment!", data);
    };
    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
    };
    let currency = "USD"; // or you can set this value from your props or state
    let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    return (
      <PaypalExpressBtn currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel}/>
    );
  }

  render() {
    const {paymentType, messageSanction, loading} = this.state;
    return (
      <BlockUi tag="div" blocking={loading}>
        <Row>
          <Col>
            <Form>
              <FormGroup row>
                <Col>
                  <InputGroup>
                    <input type="text" name="name"
                           onKeyPress={(e) => {
                             if (e.which === 13) e.preventDefault()
                           }}
                           className="form-control"
                           ref={input => this.sanctionNameRef = input}
                           placeholder="Name"/>
                    <InputGroupAddon addonType="append">
                      <Button type="button" color="secondary" onClick={(e) => this.handleOnCheckClick(e)}>
                        Check
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <br/>
                  {messageSanction && (
                    <Alert color="success" className="text-center">
                      {messageSanction}
                    </Alert>
                  )}
                </Col>
              </FormGroup>
              <FormGroup>
                <div className="paymenttype-wrapper">
                  <CustomInput
                    type="radio"
                    name="paymentType"
                    style={{marginRight: 20}}
                    id="paymentTypeCard"
                    checked={paymentType === PAYMENT_TYPE.CARD}
                    value={PAYMENT_TYPE.CARD}
                    onChange={() => this.handleOnRadioChange(PAYMENT_TYPE.CARD)}
                    label="Card"
                  />
                  <CustomInput
                    type="radio"
                    name="paymentType"
                    value={PAYMENT_TYPE.PAYPAL}
                    id="paymentTypePaypal"
                    checked={paymentType === PAYMENT_TYPE.PAYPAL}
                    onChange={() => this.handleOnRadioChange(PAYMENT_TYPE.PAYPAL)}
                    label="Paypal"
                  />
                </div>
              </FormGroup>
              <div style={{textAlign: "center"}}>
                {/*{paymentType === PAYMENT_TYPE.PAYPAL && this.renderBtnPaypal()}*/}
              </div>
              {/*{paymentType === PAYMENT_TYPE.CARD && <PaymentCards {...this.props} />}*/}
              <div className="text-center">
                <button className="btn btn-primary"> Payment Request </button>
              </div>
            </Form>
          </Col>
          <Footer to="/cards" showCookieMsg/>
        </Row>
      </BlockUi>
    );
  }
}

export default PaymentOptions;
