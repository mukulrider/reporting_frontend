/*
 *
 * DelistContainer
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectDelistContainer from './selectors';
import messages from './messages';
import Button from 'components/button';
import BarChart2 from 'components/BarChart2';
import WaterFallChart2 from 'components/WaterFallChart2';
import Spinner from 'components/spinner';

import {
  makeSideFilter, makeUrlParams, makeUrlParamsString,
} from './selectors';

import Selector from 'components/Selector';
import SelectorDelist from 'components/SelectorDelist';
import {browserHistory} from 'react-router';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import {Modal} from 'react-bootstrap';
import {
  apiFetch,
  dataUrlParams,
  WeekClick,
  TableDataFetch,
  SubstitutesClick,
  SupplierImpactTableClick,
  generateSideFilter,
  generateUrlParams,
  generateTable,
  generateUrlParamsString,
  WaterfallValueChart,
  WaterfallValueChartSuccess,
  ajaxClick
} from './actions';

import styles from './style.scss';

export class DelistContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.onDataUrlParams(this.props.location.query);
    this.props.onApiFetch();
    this.props.onWaterfallValueChart();
    this.props.onGenerateSideFilter();
  };

  componentDidUpdate = () => {
    this.props.onDataUrlParams(this.props.location.query);
  };

  constructor(props) {
    super(props);
    this.state = {smShow: false, lgShow: false};
  }

  render() {

    let formatSales = (i) =>  {
      if(i>=1000 || i<=-1000)
      { let rounded=Math.round(i /1000)
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      }

      else{
        return ('£ ' + Math.round(i));
      }
    }


    let formatVolume = (i) => {
      if(i>=1000 || i<=-1000)
      { let rounded=Math.round(i /1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      }else{
        return (Math.round(i));
      }


    }

    return (

      <div className="row" style={{fontSize: '14px'}}>
        <div className="col-xs-2">
          <Panel>
            <SelectorDelist sideFilter={this.props.DelistContainer.sideFilter}
                            location={this.props.location}
                            onGenerateTable={this.props.onGenerateTable}
                            onGenerateUrlParams={this.props.onGenerateUrlParams}
                            onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}/>
          </Panel>
        </div>
        {  console.log("hiii", this.props.DelistContainer) }
        <div className="col-xs-10">
          <div className="row">
            <Button onClick={() => {
              let a = "13_weeks";
              this.props.onWeekClick(a);
              browserHistory.push(this.props.location.pathname + "?time_period=13_weeks")
            }}>WEEK 13</Button>&nbsp;
            <Button onClick={() => {
              let b = "26_weeks";
              this.props.onWeekClick(b);
              browserHistory.push(this.props.location.pathname + "?time_period=26_weeks")
            }}>Week 26</Button>
            <Button onClick={() => {
              let c = "52_weeks";
              this.props.onWeekClick(c);
              browserHistory.push(this.props.location.pathname + "?time_period=52_weeks")
            }}>Week 52</Button>
          </div>

          <h1 className="ts-blk-proview-subhead ts-blk-proview">SALES IMPACT</h1>

          {(() => {
            if (this.props.DelistContainer.waterfallValue && this.props.DelistContainer.waterfallValue.sales_chart && this.props.DelistContainer.waterfallValue.vols_chart) {
              return (
                <div className="row">

                  <div className="col-xs-6">
                    <Panel>
                      <h3 className="ts-blk-proview-subhead ts-blk-proview">Value</h3>
                      <WaterFallChart2 id="waterfallChart_1"
                                       data={ this.props.DelistContainer.waterfallValue.sales_chart }/>

                    </Panel>
                  </div>
                  <div className="col-xs-6">
                    <Panel>
                      <h3 className="ts-blk-proview-subhead ts-blk-proview">Volume</h3>
                      <WaterFallChart2 id="waterfallChart_2"
                                       data={ this.props.DelistContainer.waterfallValue.vols_chart }/>
                    </Panel>
                  </div>
                </div>
              )
            } else {
              return (
                <div><h2 className="text-center">Please Wait a Moment....! </h2></div>
              )
            }
          })()}

          <h1 className="ts-blk-proview-subhead ts-blk-proview">PROFIT IMPACT</h1>


          {(() => {
            if (this.props.DelistContainer.waterfallValue && this.props.DelistContainer.waterfallValue.cgm_chart && this.props.DelistContainer.waterfallValue.cts_chart) {
              return (
                <div className="row">
                  <div className="col-xs-6">
                    <Panel>
                      <h3 className="ts-blk-proview-subhead ts-blk-proview">CGM</h3>
                      <WaterFallChart2 id="waterfallChart_3"
                                       data={ this.props.DelistContainer.waterfallValue.cgm_chart }/>
                    </Panel>
                  </div>
                  <div className="col-xs-6">
                    <Panel>
                      <h3 className="ts-blk-proview-subhead ts-blk-proview">CTS</h3>
                      <WaterFallChart2 id="waterfallChart_4"
                                       data={ this.props.DelistContainer.waterfallValue.cts_chart }/>
                    </Panel>
                  </div>
                </div>
              )
            }
          })()}


          <h1 className="ts-blk-proview-subhead ts-blk-proview">SUPPLIER IMPACT</h1>

          <Panel>
            <table className="table table-hover table-striped table-bordered table_cust">
              <thead>
              <th>Supplier</th>
              <th>Total value from supplier</th>
              <th>Direct value loss from delisted products</th>
              <th>Value gained from substitution</th>
              <th>Net Impact</th>
              <th>Net Impact %</th>
              <th>Total volume from supplier</th>
              <th>Direct volume loss from delisted products</th>
              <th>Volume gained from substitution</th>
              <th>Net Impact</th>
              <th>Net Impact %</th>
              </thead>
              <tbody>
              {
                (() => {
                  if (this.props.DelistContainer.data && this.props.DelistContainer.data.sup_sales_table) {
                    console.log("supplier table", this.props.DelistContainer.data.sup_sales_table);
                    let a = this.props.DelistContainer.data.sup_sales_table;
                    return a.map(obj => {
                      return (

                        <tr id={Math.random() + Date.now()} onClick={() => {
                          {/*this.props.onSubstitutesClick();*/
                          }
                          {/*browserHistory.push(this.props.location.pathname + "?week=4")*/
                          }
                          {/*alert(obj.parent_supplier);*/}
                          this.props.onSupplierImpactTableClick(obj.parent_supplier);
                          this.setState({smShow: true});
                          {/*alert("hi");*/
                          }
                        }}>
                          <td>{obj.parent_supplier}</td>
                          <td>{obj.predicted_value_share}</td>
                          <td>{obj.value_loss_share}</td>
                          <td>{obj.value_gain_share}</td>
                          <td>{obj.value_impact}</td>
                          <td>{obj.value_impact_per}</td>
                          <td>{obj.predicted_volume_share}</td>
                          <td>{obj.vols_loss_share}</td>
                          <td>{obj.vols_gain_share}</td>
                          <td>{obj.vol_impact}</td>
                          <td>{obj.vol_impact_per}</td>
                        </tr>
                      )
                    })
                  }
                })()
              }
              </tbody>
            </table>
          </Panel>

          {/*MODAL FOR SUPPLIER IMPACT TABLE*/}
          <Panel>
            <Modal show={this.state.smShow} bsClass="modal" bsSize="large" aria-labelledby="contained-modal-title-sm" dialogClassName="custom-modal">
              <Modal.Header>
                <Modal.Title id="contained-modal-title-sm">
                  <div style={{textAlign: 'center'}}><b>SUPPLIER IMPACT - POPUP TABLE</b></div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <table className="table table-hover table-striped table-bordered table_cust" style={{fontSize: '16px'}}>
                  <thead>
                  <tr style={{fontWeight: 'bold'}}>
                    <td>Delisted product</td>
                    <td>Predicted Value</td>
                    <td>Predicted Volume</td>
                    <td>Value loss</td>
                    <td>Volume loss</td>
                    <td>Substituting Supplier</td>
                    <td>Substituting Product</td>
                    <td>Value gain due to substitution</td>
                    <td>Volume gain due to substitution</td>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    (() => {
                      if (this.props.DelistContainer.supplierPopuptableDataSuccess) {
                        console.log("supplier table new", this.props.DelistContainer.supplierPopuptableDataSuccess.supplier_table_popup);
                        console.log(this.props.DelistContainer.supplierPopuptableDataSuccess.supplier_table_popup);

                        let a = this.props.DelistContainer.supplierPopuptableDataSuccess.supplier_table_popup;
                        return a.map(obj => {
                          return (

                            <tr>
                              <td>{obj.productcode} - {obj.productdescription}</td>
                              <td>{formatSales(obj.delist_pred_value)}</td>
                              <td>{formatVolume(obj.delist_pred_vol)}</td>
                              <td>{formatSales(obj.delist_value_loss)}</td>
                              <td>{formatVolume(obj.delist_vol_loss)}</td>
                              <td>{obj.substitute_supplier}</td>
                              <td>{obj.substituteproductcode}-{obj.substituteproductdescription}</td>
                              <td>{formatSales(obj.substitute_value_gain)}</td>
                              <td>{formatVolume(obj.substitute_vol_gain)}</td>
                            </tr>
                          )
                        })
                      }
                    })()
                  }
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => this.setState({smShow: false})}
                  style={{display: 'block', margin: '0 auto'}}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Panel>


          <h1 className="ts-blk-proview-subhead ts-blk-proview">DELIST PRODUCT TABLE</h1>

          <Panel>
            <table className="table table-hover table-striped table-bordered table_cust">
              <thead>
              <th>Product Code</th>
              <th>Product Description</th>
              <th>No of Stores</th>
              <th>Predicted Value</th>
              <th>Predicted Volume X</th>
              <th>Predicted Cgm</th>
              <th>View Substitutes</th>
              </thead>
              <tbody>
              {
                (() => {
                  if (this.props.DelistContainer.data && this.props.DelistContainer.data.delist_prod_table) {
                    {/*console.log("delist table data", this.props.DelistContainer.data.delist_prod_table);*/
                    }
                    return this.props.DelistContainer.data.delist_prod_table.map(obj => {
                      return (
                        <tr id={Math.random() + Date.now()}>
                          <td>{obj.productcode}</td>
                          <td>{obj.long_description}</td>
                          <td>{obj.no_of_stores}</td>
                          <td>{obj.predicted_sales}</td>
                          <td>{obj.predicted_volume_x}</td>
                          <td>{obj.predicted_cgm}</td>
                          <td><Button onClick={() => {

                            {/*alert(obj.productcode);*/}
                            this.props.onSubstitutesClick(obj.productcode);
                            {/*browserHistory.push(this.props.location.pathname + "?delist_product="+(obj.productcode));*/
                            }
                            this.setState({lgShow: true});
                            if (this.props.DelistContainer) {
                              {/*console.log(this.props.DelistContainer.data.delist_prod_table);*/
                              }
                            }

                          }}>View Substitutes</Button></td>
                        </tr>
                      )
                    })
                  }
                })()
              }
              </tbody>
            </table>
          </Panel>

          {/*MODAL FOR PRODUCT IMPACT TABLE*/
          }
          <Panel>

            <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
              <Modal.Header>
                <Modal.Title id="contained-modal-title-sm">
                  <div style={{textAlign: 'center'}}><b> PRODUCT IMPACT TABLE</b></div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-dialog modal-lg">
                <table className="table " style={{fontSize: '16px'}}>
                  <thead>
                  <tr id={Math.random() + Date.now()} style={{fontWeight: 'bold'}}>
                    <td>Substitute Product Code</td>
                    <td>Substitute Product Description</td>
                  </tr>
                  </thead>
                  <tbody>
                  {(() => {
                    if (this.props.DelistContainer.substitutesTableData) {
                      return this.props.DelistContainer.substitutesTableData.delist_table_popup.map(obj => {
                          return (
                            <tr>
                              <td>{obj.substituteproductcode}</td>
                              <td>{obj.substituteproductdescription}</td>
                            </tr>
                          )
                        }
                      )
                    }
                  })()}
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  onClick={() => this.setState({lgShow: false})}
                  style={{display: 'block', margin: '0 auto'}}>Close</Button>
              </Modal.Footer>
            </Modal>

          </Panel>
        </div>
      </div>
    )
  }
}

DelistContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DelistContainer: makeSelectDelistContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onApiFetch: (e) => dispatch(apiFetch(e)),
    onDataUrlParams: (e) => dispatch(dataUrlParams(e)),
    onWeekClick: (e) => dispatch(WeekClick(e)),
    onTableDataFetch: (e) => dispatch(TableDataFetch(e)),

    // POPUP FOR SUBSTITUTE TABLE
    onSubstitutesClick: (e) => dispatch(SubstitutesClick(e)),

    // POPUP FOR SUPPLIER IMPACT TABLE TABLE
    onSupplierImpactTableClick: (e) => dispatch(SupplierImpactTableClick(e)),

    onWaterfallValueChart: (e) => dispatch(WaterfallValueChart(e)),

    onGenerateTable: (e) => dispatch(generateTable(e)),
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),

    //TESTING AJAX
    onAjaxClick: (e) => dispatch(ajaxClick(e)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelistContainer);
