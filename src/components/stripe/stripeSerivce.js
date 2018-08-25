import axios from 'axios';
import {STRIPE_SECRET_KEY} from "../../constanst";

export const createCustomer = (data) => {
  return axios.post('https://api.stripe.com/v1/customers',
    queryParams(data)
    , {
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json',
      },
    })
}

const queryParams = (params) => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');