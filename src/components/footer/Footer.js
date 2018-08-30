import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";

class Footer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      closeCookie: false
    }
  }
  componentDidMount() {
    if(window.cookieconsent && this.props.showCookieMsg) {
      window.cookieconsent.initialise({
        "palette": {
          "popup": {
            "background": "#000"
          },
          "button": {
            "background": "#f1d600"
          }
        },
        "type": "opt-out"
      });
    }
  }
  render() {
    const {
      to
    } = this.props;
    return (
      <div className="footer">
        <Link to={to} className="btn btn-primary">Next</Link>
      </div>
    );
  }
}

export default Footer;