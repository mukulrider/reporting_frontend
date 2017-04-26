/**
 *
 * SelectorNegotiation
 *
 */

import React from 'react';
// import styled from 'styled-components';
import {browserHistory} from 'react-router';
import style from './style.scss';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';


class SelectorNegotiation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  generateKeys = (obj) => {
    let buyer = [];
    let junior_buyer = [];
    let need_state = [];
    let brand_indicator = [];
    let brand_name = [];
    let product_sub_group = [];
    console.log("in generate keys",obj);
    Object.keys(obj).forEach(i => {
      Object.keys(obj[i]).forEach(j => {
        buyer.push(j);
        Object.keys(obj[i][j]).forEach(k => {
          junior_buyer.push(k);
          Object.keys(obj[i][j][k]).forEach(l => {
            need_state.push(l);
            Object.keys(obj[i][j][k][l]).forEach(m => {
              brand_indicator.push(m);
              Object.keys(obj[i][j][k][l][m]).forEach(n => {
                brand_name.push(n);
                (obj[i][j][k][l][m][n]).forEach(o => {
                  product_sub_group.push(o);
                })
              })
            })
          })
        })
      })
    });

    //Taking unique of array
    var unique = function(origArr) {
      var newArr = [],
        origLen = origArr.length,
        found, x, y;

      for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
          if (origArr[x] === newArr[y]) {
            found = true;
            break;
          }
        }
        if (!found) {
          newArr.push(origArr[x]);
        }
      }
      return newArr;
    }

    var brand_indicator_Unique = unique(brand_indicator);

    return {
      buying_controller: Object.keys(obj),
      buyer: buyer,
      junior_buyer: junior_buyer,
      need_state: need_state,
      brand_indicator: brand_indicator_Unique,
      brand_name: brand_name,
      product_sub_group_description: product_sub_group
    };

  };

  updateUrl2 = (evt, category) => {
    let newUrl = this.props.location.pathname;
    let x = '';
    // let queryParams = this.props.location.query;
    // console.log(this.refs.selector);
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        x = x + `${obj.name.split('__')[1]}=${obj.value}&`;
      }
    });

    const queryString = x.substring(0, x.length - 1);
    this.props.onGenerateUrlParamsString(queryString);
    //browserHistory.push(newUrl + '?' + queryString);

      if (this.props.dataPerformanceUrlParams!==''&& this.props.dataStoreUrlParams!=='') {
          browserHistory.push(newUrl+"?"+this.props.dataStoreUrlParams+"&"+queryString+"&"+this.props.dataPerformanceUrlParams);
      } else if (this.props.dataPageUrlParams!==''|| this.props.dataWeekUrlParams!=='') {
          browserHistory.push(newUrl+"?"+this.props.dataStoreUrlParams+this.props.dataPerformanceUrlParams+"&"+queryString);
      }
      else{
          browserHistory.push(newUrl + '?' + queryString);
      }
  };

  updateUrl = (evt, category) => {
    evt.target.checked = !!evt.target.checked;
    this.updateUrl2(evt, category);
  };

  componentDidUpdate = () => {
    const urlParams = this.props.location.query;
    // console.log(urlParams);
    this.props.onGenerateUrlParams(urlParams);
    this.props.onURLRequest(urlParams);
    this.props.onGenerateTable();
    this.props.onFetchGraph();


  };

  render() {
    return (
      <div ref={'selector'}>
        {(() => {
          if (this.props.sideFilter) {
            const filterKeysList = this.generateKeys(this.props.sideFilter);
            return Object.keys(filterKeysList).map(category => {
              return (
                <Panel>
                  <div key={Date.now() + Math.random()}
                       ref={'selector__' + category}
                       className=" text-capitalize">
                    <div className="panel-heading"
                         style={{
                           fontWeight: '700',
                           fontSize: '16px',
                           borderBottom: '1px solid #ddd'
                         }}>{category.replace(/_/, ' ')}</div>
                    <div className="panel-body"
                         style={{maxHeight: '250px', overflowX: 'scroll', overflowX: 'hidden'}}>
                      {filterKeysList[category].map(data2 => {
                        return (
                          <Checkbox value={data2.toLowerCase()}
                                    name={`selector__${category}__${data2}`.toLowerCase()}
                                    id={`selector__${category}__${data2}`.toLowerCase()}
                                    onChange={(evt) => this.updateUrl(evt, category)}
                                    valid={true}
                                    label={data2}
                                    style={{fontSize: '14px'}}
                                    checked={(() => {
                                      let params = Object.values(this.props.location.query);
                                      let newParams = [];
                                      params.map(obj => {
                                        if (typeof obj == 'string') {
                                          newParams.push(obj.toLowerCase())
                                        } else {
                                          obj.map(obj2 => {
                                            newParams.push(obj2.toLowerCase())
                                          })
                                        }
                                      });
                                      if (newParams.indexOf(data2.toLowerCase()) > -1) {
                                        return true
                                      }
                                      return false;
                                    })()}/>
                        )
                      })}
                    </div>
                  </div>
                </Panel>
              )
            });
          } else {
            return (
              <div>
                {[1, 2, 3].map(() => {
                  return (
                    <div key={Date.now() + Math.random()} className="panel panel-default ">
                      <div className="panel-heading"
                           style={{height: '30px'}}></div>
                      <div className="panel-body"
                           style={{height: '100px'}}></div>
                    </div>
                  )
                })}
              </div>
            )
          }
        })()}
      </div>
    );
  }
}

SelectorNegotiation.propTypes = {};

export default SelectorNegotiation;
