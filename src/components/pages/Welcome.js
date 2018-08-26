/* eslint-disable */
import React, {PureComponent} from 'react';
import {Col, Row} from 'reactstrap';
import Footer from '../footer/Footer'
import {FB_APP_ID} from "../../constanst";

class Welcome extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    MessengerExtensions.getSupportedFeatures(function success(result) {
      let features = result.supported_features;
      if (features.indexOf("context") != -1) {
        window.MessengerExtensions.getContext(FB_APP_ID,
          function success(thread_context) {
            document.getElementById('psidValue').innerHTML = `Messenger ID: ${thread_context.psid}`;
          },
          function error(err) {
            document.getElementById('psidValue').innerHTML = `ERROR: ${err}`;
          }
        );
      }
    }, function error(err) {
      document.getElementById('psidValue').innerHTML = `ERROR: ${err}`;
    });
  }

  render() {
    return (
      <Row>
        <Col>
          <h3 id="psidValue"></h3>
        </Col>
        <Footer to="/options" showCookieMsg/>
      </Row>
    );
  }
}

export default Welcome;