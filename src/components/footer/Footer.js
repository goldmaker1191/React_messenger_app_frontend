import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import {UncontrolledAlert} from "reactstrap";

class Footer extends PureComponent {
  render() {
    const {
      to, showCookieMsg
    } = this.props;
    return (
      <div className="footer">
        <Link to={to} className="btn btn-primary">Next</Link>
        {showCookieMsg && <UncontrolledAlert color="info" className="cookie-popup">
          This website is using cookies.
        </UncontrolledAlert>}

      </div>
    );
  }
}

export default Footer;