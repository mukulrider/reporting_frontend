/**
 *
 * SelectorDelist
 *
 */

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import {browserHistory} from 'react-router';
import style from './style.scss';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';

class SelectorDelist extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  generateKeys = (obj) => {
    const buying_controller = [];
    const parent_supplier = [];
    const buyer = [];
    const junior_buyer = [];
    const product_sub_group = [];
    const brand_indicator = [];
    const products = [];

    Object.keys(obj).forEach((i) => {
      Object.keys(obj[i]).forEach((j) => {
        buying_controller.push(j);
        Object.keys(obj[i][j]).forEach((k) => {
          parent_supplier.push(k);
          Object.keys(obj[i][j][k]).forEach((l) => {
            buyer.push(l);
            Object.keys(obj[i][j][k][l]).forEach((m) => {
              junior_buyer.push(m);
              Object.keys(obj[i][j][k][l][m]).forEach((n) => {
                product_sub_group.push(n);
                // (obj[i][j][k][l][m][n]).forEach(o => {
                // brand_indicator.push(o);
                // Object.keys(obj[i][j][k][l][m][n][o]).forEach(p => {
                // obj[i][j][k][l][m][n][o].forEach(p => {
                // products.push(p);
                // })
                // })
              })
            });
          });
        });
      });
    });

    return {
      commercial_director: Object.keys(obj),
      parent_supplier,
      buyer,
      junior_buyer,
      product_sub_group: product_sub_group,
      //brand_indicator: brand_indicator,
      //products: products
    };
    // ['commercial_director', 'buying_controller', 'buyer']
  };

  updateUrl2 = (evt, category) => {
    const newUrl = this.props.location.pathname;
    let x = '';
    // let queryParams = this.props.location.query;
    // console.log(this.refs.selector);
    [...this.refs.selector.querySelectorAll('input')].map((obj) => {
      if (obj.checked == true) {
        x = `${x}${obj.name.split('__')[1]}=${obj.value}&`;
      }
    });

    const queryString = x.substring(0, x.length - 1);
    this.props.onGenerateUrlParamsString(queryString);
    browserHistory.push(`${newUrl}?${queryString}`);
  };

  updateUrl = (evt, category) => {
    evt.target.checked = !!evt.target.checked;
    this.updateUrl2(evt, category);
  };

  componentDidUpdate = () => {
    const urlParams = this.props.location.query;
    // console.log(urlParams);
    // this.props.onGenerateUrlParams(urlParams);
    this.props.onGenerateTable();
    // if (Object.keys(urlParams).length > 0) {
    //   Object.keys(urlParams).map(param => {
    //     if (typeof urlParams[param] == 'string') {
    //       this.refs[`selector__${param}__${urlParams[param]}`].checked = true;
    //     } else {
    //       urlParams[param].map(param2 => {
    //         this.refs[`selector__${param}__${param2}`].checked = true;
    //       })
    //     }
    //   })
    // }
  };

  render() {
    return (
      <div ref={'selector'}>
        {(() => {
          if (this.props.sideFilter) {
            const filterKeysList = this.generateKeys(this.props.sideFilter);
            return Object.keys(filterKeysList).map((category) => (
              <Panel>
                <div
                  key={Date.now() + Math.random()}
                  ref={`selector__${category}`}
                  className=" text-capitalize"
                >
                  <div
                    className="panel-heading"
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                      borderBottom: '1px solid #ddd',
                    }}
                  >{category.replace(/_/, ' ')}</div>
                  <div
                    className="panel-body"
                    style={{maxHeight: '250px', overflowX: 'scroll', overflowX: 'hidden'}}
                  >
                    {filterKeysList[category].map((data2) => (
                      <Checkbox
                        value={data2.toLowerCase()}
                        name={`selector__${category}__${data2}`.toLowerCase()}
                        id={`selector__${category}__${data2}`.toLowerCase()}
                        onChange={(evt) => this.updateUrl(evt, category)}
                        valid
                        label={data2}
                        style={{fontSize: '14px'}}
                        checked={(() => {
                          const params = Object.values(this.props.location.query);
                          const newParams = [];
                          params.map((obj) => {
                            if (typeof obj === 'string') {
                              newParams.push(obj.toLowerCase());
                            } else {
                              obj.map((obj2) => {
                                newParams.push(obj2.toLowerCase());
                              });
                            }
                          });
                          if (newParams.indexOf(data2.toLowerCase()) > -1) {
                            return true;
                          }
                          return false;
                        })()}
                      />
                    ))}
                  </div>
                </div>
              </Panel>
            ));
          } else {
            return (
              <div>
                {[1, 2, 3].map(() => (
                  <div key={Date.now() + Math.random()} className="panel panel-default ">
                    <div
                      className="panel-heading"
                      style={{height: '30px'}}
                    ></div>
                    <div
                      className="panel-body"
                      style={{height: '100px'}}
                    ></div>
                  </div>
                ))}
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

SelectorDelist
  .propTypes = {};

export
default
SelectorDelist;
