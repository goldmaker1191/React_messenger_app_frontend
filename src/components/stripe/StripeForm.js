import React from 'react';
import {createCustomer} from '../stripe/stripeSerivce'
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  PostalCodeElement
} from 'react-stripe-elements';
import './StripeForm.css';

class PaymentStripeRequestForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.trackEvent({
      category: 'PaymentCard',
      action: 'summit',
      label: 'Summit Button'
    });
    const {
      stripe: stripeService
    } = this.props;
    if (stripeService) {
      stripeService
        .createToken()
        .then((payload) => {
          if (!payload.error) {
            const {card} = payload.token;
            const customerData = {
              'metadata[data]': JSON.stringify(card),
              description: `Customer for ${card.name || payload.token.client_ip}`,
            };
            createCustomer(customerData).then(rp => {
              console.log(rp);
              window.location.href = '/success';
            }).catch(err => {
              console.log(err);
            })
          }
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
          padding,
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };
  // handleBlur = () => {
  //   console.log('[blur]');
  // };
  // handleChange = (change) => {
  //   console.log('[change]', change);
  // };

  // handleFocus = () => {
  //   console.log('[focus]');
  // };
  // handleReady = () => {
  //   console.log('[ready]');
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card number
          <CardNumberElement
            ref={cardNumberNode => this.cardNumberRef = cardNumberNode}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <div className="action">
          <button>Payment Request</button>
        </div>
      </form>
    )
  }
}

export default injectStripe(PaymentStripeRequestForm);
