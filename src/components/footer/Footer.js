import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";

class Footer extends PureComponent {
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