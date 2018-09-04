import React from 'react';
import {charges, createCustomer} from '../../appService'
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  PostalCodeElement
} from 'react-stripe-elements';
import './StripeForm.css';
import {CHARGE_AMOUNT} from "../../constanst";
import 'react-block-ui/style.css';

class PaymentStripeRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
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
            stripeService.createSource({
              type: 'card',
              cardNumber: card.cardNumber,
              cardExpiry: card.cardExpiry,
              cardCvc: card.cardCvc,
            }).then(function (sourceResult) {
              if (sourceResult.error) {
                document.getElementById('charge-error-message').innerHTML = sourceResult.error.message;
              } else {
                const customerData = {
                  'metadata[data]': JSON.stringify(card),
                  description: `Customer for ${card.name || payload.token.client_ip}`,
                };
                createCustomer(customerData).then(customerRp => {
                  charges({
                    currency: 'gbp',
                    amount: CHARGE_AMOUNT,
                    customer: customerRp.data.id,
                    source: sourceResult.source.id,
                  }).then((rp) => {
                    console.log('charges rp', rp);
                    if (rp.error) {
                      document.getElementById('charge-error-message').innerHTML = rp.error.message;
                    } else {
                      window.location.href = '/success';
                    }
                  }).catch(err => {
                    document.getElementById('charge-error-message').innerHTML = err.response.data.error.message;
                  })
                }).catch(err => {
                  document.getElementById('charge-error-message').innerHTML = err;
                })
              }
            });
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
      <form onSubmit={(ev) => this.handleSubmit(ev)}>
        <label>
          Card number
          <CardNumberElement
            token="tok_gb"
            placeholder="4000 0082 6000 0000"
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
            placeholder="WS11 1DB"
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <div className="action">
          <p id="charge-error-message"></p>
          <br/>
          <button>Pay £{CHARGE_AMOUNT} </button>
        </div>
      </form>
    )
  }
}

export default injectStripe(PaymentStripeRequestForm);
