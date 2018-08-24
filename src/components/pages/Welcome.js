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
      psid: null
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
    this.setState({
      psid: `result: componentDidMount`
    });
    window.extAsyncInit = function() {
      // the Messenger Extensions JS SDK is done loading
      this.setState({
        psid: `result: extAsyncInit`
      });
      window.MessengerExtensions.getSupportedFeatures(function success(result) {
        let features = result.supported_features;
        this.setState({
          psid: `result: ${result}`
        });
        if (features.indexOf("context") != -1) {
          window.MessengerExtensions.getContext('1199034160165944',
            function success(thread_context) {
              // success
              this.setState({
                psid: thread_context.psid
              })
              // More code to follow
            },
            function error(err) {
              console.log(err);
              this.setState({
                psid: `ERROR: ${err}`
              })
            }
          );
        }
      }, function error(err) {
        console.log(err);
        this.setState({
          psid: `ERROR: ${err}`
        })
      });
    };
  }

  render() {
    const {
      psid
    } = this.state;
    return (
      <Row>
        <Col>
          <h3> Messenger ID:  {psid} </h3>
        </Col>
        <Footer to="/options"/>
      </Row>
    );
  }
}

export default Welcome;