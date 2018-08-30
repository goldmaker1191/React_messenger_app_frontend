/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, {Component} from 'react';
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactPixel.pageView(page);
    ReactGA.pageview(page);
    if(window.hj) {
      window.hj('stateChange', page);
    }
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    trackEvent({category, action, label}) {
      ReactPixel.track('event', {category, action, label});
      ReactGA.event({category, action, label});
    }

    render() {
      return <WrappedComponent {...this.props} trackEvent={this.trackEvent}/>;
    }
  };

  return HOC;
}
