import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import {Container, Row, Col} from 'reactstrap';
import {
  Welcome, PaymentCards, PaymentOptions, PaymentSuccess
} from './components/pages'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import withTracker from './components/ga/withTracker';
import {GOOGLE_TRACK_ID, FACEBOOK_TRACK_ID } from "./constanst";

export const rootReducer = combineReducers({
  router: routerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory();
const routerMiddlewareRedux = routerMiddleware(history);

const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(routerMiddlewareRedux)
  )
)

ReactPixel.init(FACEBOOK_TRACK_ID, '', {
  autoConfig: true, 	// set pixel's autoConfig
  debug: false,
});

ReactGA.initialize({
  trackingId: GOOGLE_TRACK_ID,
  debug: false,
  gaOptions: {
    cookieDomain: 'none'
  }
});

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ConnectedRouter history={history}>
            <Container>
              <Row>
                <Col md="3"></Col>
                <Col md="6">
                  <Switch>
                    <Route exact path="/" component={withTracker(Welcome)}/>
                    <Route path="/options" component={withTracker(PaymentOptions)}/>
                    <Route path="/cards" component={withTracker(PaymentCards)}/>
                    <Route path="/success" component={withTracker(PaymentSuccess)}/>
                  </Switch>
                </Col>
                <Col md="3"></Col>
              </Row>
            </Container>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
