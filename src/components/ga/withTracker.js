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
    if (window.hj) {
      window.hj('stateChange', page);
    }
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
      if (page === '/welcome' || page === '/') {
        this.showCookieConsent(true);
      } else {
        this.showCookieConsent(false);
      }
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    showCookieConsent(isShow) {
      const $eles = document.querySelectorAll('.cc-revoke');
      if ($eles && $eles.length) {
        for (const e in $eles) {
          if($eles[e].style) {
            $eles[e].style.display = isShow ? 'block' : 'none';
          }
        }
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
