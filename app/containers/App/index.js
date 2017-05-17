/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Footer from 'components/footer';
import Header from 'components/header';
import styles from './style.scss';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  // componentWillMount() {
  //   const hostName = 'http://localhost';
  //   const hostPort = '3001';
  //   let getCookie;
  //   getCookie = (name) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) {
  //       return parts.pop().split(';').shift();
  //     } else {
  //       return 0
  //     }
  //   };
  //   const token = getCookie('token');
  //   if (token && this.props.location.pathname.includes('login')) {
  //     window.location = `http://${hostName}:${hostPort}/`;
  //   }
  //   if (!token && !this.props.location.pathname.includes('login')) {
  //     window.location = `http://${hostName}:${hostPort}/login/`;
  //   }
  // };

  // componentWillMount() {
  //   const hostName = '172.20.247.1';
  //   const hostPort = '3003';
  //   let getCookie;
  //   getCookie = (name) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) {
  //       return parts.pop().split(';').shift();
  //     } else {
  //       return 0
  //     }
  //   };
  //   const token = getCookie('token');
  //   if (token && this.props.location.pathname.includes('login')) {
  //     window.location = `http://${hostName}:${hostPort}/`;
  //   }
  //   if (!token && !this.props.location.pathname.includes('login')) {
  //     window.location = `http://${hostName}:${hostPort}/login/`;
  //   }
  // };

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid" style={{ marginTop: '120px' }}>
          {React.Children.toArray(this.props.children)}
        </div>
        <Footer />
      </div>
    );
  }
}
