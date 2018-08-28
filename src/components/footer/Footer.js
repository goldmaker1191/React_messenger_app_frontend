import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import CookieConsent from 'react-cookie-consent';

class Footer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      closeCookie: false
    }
  }
  render() {
    const {
      to, showCookieMsg
    } = this.props;
    return (
      <div className="footer">
        <Link to={to} className="btn btn-primary">Next</Link>
        <br />
        {showCookieMsg && <CookieConsent
          location="bottom"
          buttonText="Allow cookies"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B", display: this.state.closeCookie ? "none": "flex" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to ensure you get the best experience on our website
          <a href="https://cookiesandyou.com/"> Learn more </a>
          <a style={{float: 'right'}} onClick={() => this.setState({
            closeCookie: true
          })}> Decline </a>
        </CookieConsent>}

      </div>
    );
  }
}

export default Footer;