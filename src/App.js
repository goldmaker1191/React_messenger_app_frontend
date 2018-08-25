import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import {Col, Container, Row} from 'reactstrap';
import {PaymentCards, PaymentOptions, PaymentSuccess, Welcome} from './components/pages'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import withTracker from './components/ga/withTracker';
import {FACEBOOK_TRACK_ID, GOOGLE_OPTIMIZE_CONTANINER_ID, GOOGLE_TRACK_ID} from "./constanst";

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
// todo: check production or stateging https://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
// https://stackoverflow.com/questions/35469836/detecting-production-vs-development-react-at-runtime
ReactPixel.init(FACEBOOK_TRACK_ID, '', {
  autoConfig: true,
  debug: false,
});

ReactGA.initialize({
  trackingId: GOOGLE_TRACK_ID,
  debug: false
});
ReactGA.ga('require', GOOGLE_OPTIMIZE_CONTANINER_ID);

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
