import axios from "axios";
import {SANCTION_API_KEY, SANCTION_PASSWORD, SANCTION_USERNAME, SANCTION_API_URL, STRIPE_SECRET_KEY} from "./constanst";

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
    `${SANCTION_API_URL}`,
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
