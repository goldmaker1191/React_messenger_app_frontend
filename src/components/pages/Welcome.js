/* eslint-disable */
import React, {PureComponent} from 'react';
import {
  APP_ID, PAGE_ID, APP_SECRET, PAGE_ACCESS_TOKEN
} from '../../constanst'
import {Row, Col} from 'reactstrap';
import { sha256 } from 'js-sha256';
import Footer from '../footer/Footer'

class Welcome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/messenger.Extensions.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'Messenger'));

    window.extAsyncInit = function() {
      // the Messenger Extensions JS SDK is done loading
      window.MessengerExtensions.getSupportedFeatures(function success(result) {
        let features = result.supported_features;
        if (features.indexOf("context") != -1) {
          window.MessengerExtensions.getContext(APP_ID,
            function success(thread_context) {
              // success
              document.getElementById("psid").value = thread_context.psid;
              // More code to follow
            },
            function error(err) {
              console.log(err);
            }
          );
        }
      }, function error(err) {
        console.log(err);
      });
    };
  }

  render() {
    return (
      <Row>
        <Col>
          {/*<button*/}
            {/*classNames = "btn-facebook"*/}
            {/*id         = "btn-social-login"*/}
            {/*onClick={() => this.handleFBLogin()}*/}
          {/*>*/}
            {/*<span className="fa fa-facebook"></span> Sign in with Facebook*/}
          {/*</button>*/}
        </Col>
        <Footer to="/options"/>
      </Row>
    );
  }
}

export default Welcome;