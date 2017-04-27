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
import messages from './messages';
import {FormattedMessage} from 'react-intl';
import Footer from 'components/footer';
import Header from 'components/header';
import styles from './style.scss';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  generateSlector = (selectArray) => {
    return (
      <select style={{width: '100px'}}>
        {selectArray.map(obj => {
          return (
            <option key={Date.now() + Math.random()} value={obj}>{obj}</option>
          )
        })}
      </select>
    )
  };

  render() {
    return (
      <div>
        {/*<nav className="navbar navbar-default">*/}
          {/*<div className="container-fluid">*/}
            {/*<div className="navbar-header">*/}
              {/*<a className="navbar-brand" href="#"><FormattedMessage {...messages.header} /></a>*/}
            {/*</div>*/}
            {/*<ul className="nav navbar-nav">*/}
              {/*<li className="active"><a href="#">Event*/}
                {/*Name</a> {this.generateSlector(['Price Change Event1', 'Price Change Event 2'])}</li>*/}
              {/*<li><a href="#">Store Format</a> {this.generateSlector(['Express', 'Main Estate'])}</li>*/}
              {/*<li><a href="#">Start Date</a> <input type="date"/></li>*/}
              {/*<li><a href="#">Number of Weeks</a> {this.generateSlector([4, 8, 13, 52, 'YTD'])}</li>*/}
            {/*</ul>*/}
          {/*</div>*/}
        {/*</nav>*/}
        <Header/>
        <div className="container-fluid" style={{marginTop: '120px'}}>
          {React.Children.toArray(this.props.children)}
        </div>
        <Footer footerLinks={[
          {linkTitle: 'Executive View', linkHref: '/sales/executive'},
          {linkTitle: 'Competitor View', linkHref: '/sales/competitor'},
          {linkTitle: 'Promo View', linkHref: '/sales/promo'},
          {linkTitle: 'Supplier View', linkHref: '/sales/supplier'},
          ]}/>
      </div>
    );
  }
}
