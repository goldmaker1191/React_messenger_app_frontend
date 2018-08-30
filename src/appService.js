import axios from "axios";
import {SANCTION_API_KEY, SANCTION_PASSWORD, SANCTION_USERNAME, STRIPE_SECRET_KEY, PROXY_SERVER} from "./constanst";

export const createCustomer = data => {
  return axios.post("https://api.stripe.com/v1/customers", queryParams(data), {
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json"
    }
  });
};

export const sanctionCheck = ({surname}) => {
  const authEncoded = btoa(`${SANCTION_USERNAME}:${SANCTION_PASSWORD}`);
  return axios.post(
    `${PROXY_SERVER}/sanctions-check`,
    queryParams({surname, forename: surname, api_string: SANCTION_API_KEY }),
    {
      headers: {
        Authorization: `Basic ${authEncoded}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }
  ).then((rp) => {
    return rp;
  }, err => {
    console.log(err)
  });
};

const queryParams = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
