/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import messages from './messages';

import {
  ajaxRequest, generateFile, generateTable,
  generateSideFilter, fetchTable, generateUrlParams, generateUrlParamsString,
  generateTextBoxQueryString, generateScenario, generateNewScenarioString,
  generateNewScenarioStoreFormat, generateNewScenarioWeek
} from './actions';
import {AJAX_REQUEST} from './constants';
// import {Link} from 'react-router';
import Selector from 'components/Selector';
import Button from 'components/button';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import Links from 'components/link';
import Spinner from 'components/spinner';
import InputField from 'components/input_field';
import RoundedIconButton from 'components/rounded_icon_button';
import Label from 'components/label';
import Grid from 'components/grid';
import SelectInput from 'components/select_input';
import EmailField from 'components/email_field';
import {browserHistory} from 'react-router'
import styles from './style.scss';
import {Modal} from 'react-bootstrap';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  performRequest = () => {
    const queryParams = this.props.location.query;
    this.props.onGenerateTable(this.props.location.query);
  };

  constructor(props) {
    super(props);
    this.state = {smShow: false, lgShow: false};
  }

  x = (evt) => {
    // console.log(evt.target.value, this.props.location.pathname);
    // this.context.router.push('-dsa');
    this.performRequest();
    // browserHistory.push(this.props.location.pathname + '?now=' + Date.now());
  };

  componentDidMount = () => {
    // console.log('componentDidMount');
    console.log(this.props.location.query);
    console.log(this.props.params.eventId);
    this.props.onGenerateSideFilter();
    // this.performRequest();
  };

  render() {
    const callback = (e) => {
      // do nothing.
    };

    const mock = [
      {name: 1},
      {name: 2},
      {name: 3},
      {name: 4},
      {name: 5},
      {name: 6},
      {name: 7},
      {name: 8},
      {name: 9},
      {name: 10},
      {name: 11},
      {name: 12},
    ];

    const prepData = (dataObject) => {
      const dataToShow = [];

      dataObject.forEach((title) => {
        title.rowText = title.name;
        dataToShow.push(title);
      });
      return dataToShow;
    };
    return (
      <div>
        <br/>
        <div className="row" style={{fontSize: '14px'}}>
          <div className="col-xs-3">
            <div className="row">
              <div className="col-xs-4 text-right"><b>Generate Name</b></div>
              <div className="col-xs-8">
                <InputField type={'string'}
                            value={this.props.newScenarioString}
                            onChange={this.props.onGenerateNewScenarioString}
                            placeholder="Enter Name"/>
              </div>
            </div>
          </div>
          <div className="col-xs-2">
            <div className="styled-select blue rounded">
              <SelectInput
                valueUpdated={callback}
                fieldBlurred={callback}
                onChange={this.props.onGenerateNewScenarioStoreFormat}
                id="selectStoreFormat"
                name="selectStoreFormat"
                label=""
                placeholder="Store Format"
                data={[{name: 'Main Estate', rowText: 'Main Estate'},
                  {name: 'Express', rowText: 'Express'}]}
                valid
              />
              {/*<select onChange={this.props.onGenerateNewScenarioStoreFormat}>*/}
              {/*<option selected disabled hidden>Store Format</option>*/}
              {/*{['Main Estate', 'Express'].map(obj => {*/}
              {/*return <option value={obj}*/}
              {/*key={Math.random() + Date.now()}*/}
              {/*ref={'storeFormatSelect'}>{obj}</option>*/}
              {/*})}*/}
              {/*</select>*/}
            </div>
          </div>
          <div className="col-xs-2">
            <input type="date" name="bday"/>
          </div>
          <div className="col-xs-2">
            <div className="styled-select blue rounded">
              {/*<SelectInput id={'weeksSelect'}*/}
              {/*fieldBlurred={() => {*/}
              {/*return false*/}
              {/*}}*/}
              {/*name={'weeksSelect'}*/}
              {/*data={[1, 2, 3, 4, 5]}/>*/}
              <SelectInput
                valueUpdated={this.props.onGenerateNewScenarioWeek}
                fieldBlurred={callback}
                onChange={this.props.onGenerateNewScenarioWeek}
                id="selectWeeks"
                name="selectWeeks"
                label=""
                placeholder="Select Weeks"
                data={prepData(mock)}
                valid
              />
              {/*<select onChange={this.props.onGenerateNewScenarioWeek}*/}
              {/*className="">*/}
              {/*<option selected disabled hidden>Weeks</option>*/}
              {/*{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(obj => {*/}
              {/*return <option value={obj}*/}
              {/*key={Math.random() + Date.now()}*/}
              {/*ref={'weeksSelect'}>{obj}</option>*/}
              {/*})}*/}
              {/*</select>*/}
            </div>
          </div>
          <div className="col-xs-3">
            {/* ASK VYSHALI */}
            {(() => {
              if (this.props.params.eventId) {
                return (
                  <div className="text-right">
                    <Button buttonType={'primary'}
                            onClick={((e) => {
                              {/*console.log(this.refs.weeksSelect.value);*/
                              }
                              {/*console.log(this.refs.storeFormatSelect.value);*/
                              }
                              {/*console.log(this.props.newScenarioString);*/
                              }
                              {/*this.props.onGenerateScenario(e)*/
                              }
                              this.props.doGenerateScenario();
                            })}>Create Event</Button>
                  </div>
                )
              }
              else {
                return (
                  <div className="text-right">
                    <a href="/pricing/christmas-132">
                      <Button buttonType={'primary'}
                              onClick={((e) => {
                                {/*console.log(this.refs.weeksSelect.value);*/
                                }
                                {/*console.log(this.refs.storeFormatSelect.value);*/
                                }
                                {/*console.log(this.props.newScenarioString);*/
                                }
                                {/*this.props.onGenerateScenario(e)*/
                                }
                                this.props.doGenerateScenario();
                              })}>Create Event</Button></a>
                  </div>
                )
              }
            })()}
          </div>
        </div>

        {(() => {
          if (this.props.params.eventId) {
            return (
              <div>
                <hr/>
                <Modal show={this.state.lgShow} bsSize="small" aria-labelledby="contained-modal-title-sm">
                  <Modal.Body>
                    <div>
                      <InputField type="text"
                                  placeholder="Enter Forecast Name"/>
                      <br/>
                      <a href="/pricing/scenario-tracker/">
                        <Button
                          onClick={() => this.setState({lgShow: true})}
                          style={{display: 'block', margin: '0 auto'}}>
                          Generate Forecast
                        </Button>
                      </a>
                      <br/>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => this.setState({lgShow: false})}
                      style={{display: 'block', margin: '0 auto'}}>Close</Button>
                  </Modal.Footer>
                </Modal>
                <div className="row" style={{fontSize: '14px'}}>
                  <div className="col-xs-3">
                    <Selector sideFilter={this.props.sideFilter}
                              location={this.props.location}
                              onGenerateTable={this.props.onGenerateTable}
                              onGenerateUrlParams={this.props.onGenerateUrlParams}
                              onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}/>
                  </div>
                  <div className="col-xs-9">

                    <br/>
                    <div className="row">
                      <div className="col-xs-12">

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-md-2"></div>
                      <div className="col-xs-12 col-md-6"
                           style={{lineHeight: '40px', verticalAlign: 'middle'}}>
                        <h3 className="text-center" style={{marginTop: '0px'}}>Christmas Event</h3>
                      </div>
                      <div className="col-xs-12 col-md-4">
                        <Button
                          onClick={() => this.setState({lgShow: true})}
                          style={{float: 'right', margin: '0 5px 0 5px'}}>
                          Generate Forecast
                        </Button>
                      </div>
                    </div>
                    <Panel>
                      <div className="row">
                        <div className="col-xs-0 col-xs-8 "></div>
                        <div className="col-xs-12 col-xs-4">
                          <InputField type={'string'}
                                      placeholder="Enter Search Text"
                                      value={this.props.textBoxQueryString}
                                      onChange={this.props.onGenerateTextBoxQueryString}/>
                        </div>
                      </div>
                      <table className="table  ">
                        <thead className="" style={{fontWeight: '700', textAlign: 'center'}}>
                        <tr>
                          <td></td>
                          <td>Category Director</td>
                          <td>Buying Controller</td>
                          <td>Junior</td>
                          <td>Effective Date</td>
                          {/*<td>Brand Name</td>*/}
                          <td>Base Product Number</td>
                          <td>Commercial Director</td>
                          {/*<td>Product Sub Group</td>*/}
                          <td>Unit Selling Price</td>
                          <td>ASDA Price</td>
                          <td>Morissons Price</td>
                          <td>Scenario Price</td>
                        </tr>
                        </thead>
                        <tbody style={{height: '200px', overflow: 'auto'}}>
                        {(() => {
                          if (this.props.userInputTable && this.props.userInputTable.length > 0) {
                            return this.props.userInputTable.map((k, v) => {
                              return (
                                <tr key={Date.now() + Math.random()}>
                                  <td><Checkbox
                                    id={k.product_id + '_' + Math.random() + '_' + Date.now()}
                                    value={k.product_id + '_' + k.base_product_number}
                                    valid={true}
                                    label={''}/></td>
                                  <td>{k.category_director}</td>
                                  <td>{k.buying_controller}</td>
                                  <td>{k.buyer}</td>
                                  <td>{k.effective_date}</td>
                                  {/*<td>{k.base_product_number}</td>*/}
                                  <td>{k.junior_director}</td>
                                  <td>{k.commerical_director}</td>
                                  {/*<td>{k.product_sub_group_code}</td>*/}
                                  <td>£{k.unit_selling_price}</td>
                                  <td>£0.16</td>
                                  <td>£0.17</td>
                                  <td><InputField type={'number'} step="0.01" placeholder="£ Amt."/></td>
                                </tr>
                              )
                            })
                          } else {
                            return (
                              <tr key={Date.now() + Math.random()} style={{textAlign: 'center'}}>
                                {''}
                              </tr>
                            )
                          }
                        })()}
                        </tbody>
                      </table>
                    </Panel>


                  </div>
                </div>
              </div>
            )
          }
          else {
            return (
              <div style={{height: '300px'}}>
                <br/>
                <br/>
                <br/>
                <h1 style={{textAlign: 'center'}}>Please Create Event</h1>

              </div>
            );
          }
        })()}

      </div>
    );
  }
}

HomePage.PropTypes = {
  onAjaxRequest: React.PropTypes.func,
  onGenerateFile: React.PropTypes.func,
  onGenerateTable: React.PropTypes.func,
  onGenerateSideFilter: React.PropTypes.func,
  onSelectSideFilter: React.PropTypes.func,
  onFilterChange: React.PropTypes.func,
  onGenerateUrlParams: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGenerateFile: (e) => dispatch(generateFile(e)),
    onGenerateTable: (e) => dispatch(generateTable(e)),
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),
    doGenerateScenario: (e) => dispatch(generateScenario(e)),
    onGenerateNewScenarioString: (e) => dispatch(generateNewScenarioString(e.target.value)),
    onGenerateNewScenarioStoreFormat: (e) => dispatch(generateNewScenarioStoreFormat(e.target.value)),
    onGenerateNewScenarioWeek: (e) => dispatch(generateNewScenarioWeek(e.target.value)),
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  userInputTable: makeUserInputTable(),
  sideFilter: makeSideFilter(),
  urlParams: makeUrlParams(),
  urlParamsString: makeUrlParamsString(),
  textBoxQueryString: makeTextBoxQueryString(),
  newScenarioString: makeNewScenarioString(),
  newScenarioWeek: makeNewScenarioWeek(),
  newScenarioStoreFormat: makeNewScenarioStoreFormat(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
