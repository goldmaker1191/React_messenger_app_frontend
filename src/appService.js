import axios from "axios";
import { STRIPE_SECRET_KEY, SANCTION_USERNAME, SANCTION_PASSWORD, SANCTION_API_KEY } from "./constanst";

export const createCustomer = data => {
	return axios.post("https://api.stripe.com/v1/customers", queryParams(data), {
		headers: {
			Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			Accept: "application/json"
		}
	});
};

export const sanctionCheck = ({ surname }) => {
	const authEncoded = btoa(`${SANCTION_USERNAME}:${SANCTION_PASSWORD}`);
	return axios.post(
		"https://secure.underwriting-support.com/fst/api/fst_api.php",
		queryParams({ surname, api_string: SANCTION_API_KEY }),
		{
			headers: {
				Authorization: `Basic ${authEncoded}`,
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				"User-Agent": "ProExe FST API/1.0 (JJPR)"
			}
		}
	);
};

const queryParams = params =>
	Object.keys(params)
		.map(key => {
			return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
		})
		.join("&");
