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

  loadFbLoginApi() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : APP_ID,
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use version 2.1
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentDidMount() {
    this.loadFbLoginApi();
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      const rp = response.authResponse;

    });
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.testAPI();
      const data = response.authResponse;
      const appsecret_proof = sha256(`${PAGE_ACCESS_TOKEN}${APP_SECRET}`);
      FB.api(`${data.userID}?fields=name,is_payment_enabled,ids_for_apps,ids_for_pages&&access_token=${PAGE_ACCESS_TOKEN}&appsecret_proof=${appsecret_proof}`, function(response) {
        console.log('Successful ids_for_pages for: ', response);
      });
    } else if (response.status === 'not_authorized') {
      console.log("Please log into this app.");
    } else {
      console.log("Please log into this facebook.");
    }
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleFBLogin() {
    FB.login(this.checkLoginState());
  }

  render() {
    return (
      <Row>
        <Col>
          <button
            classNames = "btn-facebook"
            id         = "btn-social-login"
            onClick={() => this.handleFBLogin()}
          >
            <span className="fa fa-facebook"></span> Sign in with Facebook
          </button>
        </Col>
        <Footer to="/options"/>
      </Row>
    );
  }
}

export default Welcome;