/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';
import {PAYPAL_SANBOX_ID} from "../../constanst";

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;
    this.state = {
      showButton: false,
      env: 'sandbox', // Or 'sandbox'
      client: {
        sandbox: PAYPAL_SANBOX_ID, // sandbox client ID
      },
      commit: true, // Show a 'Pay Now' button
    };
  }

  componentDidMount() {
    const {isScriptLoaded, isScriptLoadSucceed} = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({showButton: true});
    }
  }

  componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
    if (!this.state.show) {
      if (isScriptLoaded && !this.props.isScriptLoaded) {
        if (isScriptLoadSucceed) {
          this.setState({showButton: true});
        } else {
          console.log('Cannot load Paypal script!');
          this.props.onError();
        }
      }
    }
  }

  render() {
    const payment = () => paypal.rest.payment.create(this.state.env, this.state.client, {
      transactions: [
        {amount: {total: this.props.total, currency: this.props.currency}},
      ],
    });

    const onAuthorize = (data, actions) => actions.payment.execute().then(() => {
      const payment = Object.assign({}, this.props.payment);
      payment.paid = true;
      payment.cancelled = false;
      payment.payerID = data.payerID;
      payment.paymentID = data.paymentID;
      payment.paymentToken = data.paymentToken;
      payment.returnUrl = data.returnUrl;
      this.props.onSuccess(payment);
    });

    let ppbtn = '';
    if (this.state.showButton) {
      ppbtn = (<paypal.Button.react
        env={this.state.env}
        client={this.state.client}
        payment={payment}
        commit
        onAuthorize={onAuthorize}
        onCancel={this.props.onCancel}
      />);
    }
    return <div>{ppbtn}</div>;
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);