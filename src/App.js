import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import { Container, Row, Col } from 'reactstrap';
import {
  Welcome, PaymentCards, PaymentOptions, PaymentSuccess
} from './components/pages'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

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
);

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
                  <Route exact path="/" component={Welcome}/>
                  <Route path="/options" component={PaymentOptions}/>
                  <Route path="/cards" component={PaymentCards}/>
                  <Route path="/success" component={PaymentSuccess}/>
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
