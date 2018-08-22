import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Footer from '../footer/Footer'

class Welcome extends PureComponent {
  render() {
    return (
      <Row>
        <Col>
          <MessengerCustomerChat
            pageId="<PAGE_ID>"
            appId="226699394730535"
            htmlRef="<REF_STRING>"
          />
        </Col>
        <Footer to="/options"/>
      </Row>
    );
  }
}

export default Welcome;