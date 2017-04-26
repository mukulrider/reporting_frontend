/*
 *
 * RangingHomePage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingHomePage from './selectors';
import messages from './messages';
import TestComponent from 'components/TestComponent';
import Button from 'components/button';
import Spinner from 'components/spinner';

import {
  apiFetch
} from './actions';


export class RangingHomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let group = [{name: 'harshit', age: 24}, {name: 'nishant', age: 23}, {name: 'harman', age: 24}];

    let someFunc = () => {
      console.log('button1');
    };
    console.log(this.props.RangingHomePage.name);
    //noinspection JSUnresolvedVariable
    return (
      <div style={{fontSize: '14px'}}>


        <Button onClick={someFunc} onMouseOver={someFunc}>Click me!</Button>
        <Button onClick={this.props.onApiFetch}>Ajax Button</Button>
        {group.map(obj => {
          return (
            <TestComponent key={Math.random() + Date.now()} name={obj.name} age={obj.age}/>
          )
        })}

        <Button>Testing Ajax</Button>

        <table className="table table-bordered table-striped table-hover">
          <thead>
          <th>product_code</th>
          <th>product_name</th>
          <th>volume</th>
          <th>sales</th>
          <th>buyer</th>
          <th>supplier</th>
          </thead>
          <tbody>
          {(() => {
            if (this.props.RangingHomePage.data) {
              return this.props.RangingHomePage.data.map(obj => {
                return (
                  <tr>
                    <td>{obj.name}</td>
                    <td>{obj.weeks}</td>
                    <td>{obj.status}</td>
                  </tr>
                )
              })
            }
          })()}
          {/*{this.props.RangingHomePage.group2.map(obj => {*/}

          {/*return (*/}
          {/*<tr key={Math.random() + Date.now()}>*/}
          {/*<td>{obj.product_code}</td>*/}
          {/*<td>{obj.product_name}</td>*/}
          {/*<td>{obj.volume}</td>*/}
          {/*<td>{obj.sales}</td>*/}
          {/*<td>{obj.buyer}</td>*/}
          {/*<td>{obj.supplier}</td>*/}
          {/*</tr>*/}
          {/*)*/}
          {/*})}*/}
          </tbody>
        </table>
      </div>
    );
  }
}

RangingHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  RangingHomePage: makeSelectRangingHomePage(),
});

function mapDispatchToProps(dispatch) {

  return {
    onApiFetch: (e) => dispatch(apiFetch(e))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RangingHomePage);
