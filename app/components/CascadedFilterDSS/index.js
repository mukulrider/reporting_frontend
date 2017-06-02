/**
 *
 * CascadedFilterDSS
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import {Accordion, PanelGroup, Panel} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import styles from './style.scss';

class CascadedFilterDSS extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    let selector = '';
  };

  constructor(props) {
    super(props);
    this.state = {
      alertShow: false,
      alertmsg: "Please Select the Mandatory Filters (marked with star)."
    };

  }

  componentDidUpdate = () => {

  };

  checkboxUpdate = (selection) => {

    let newUrl = this.props.location.pathname;

    let queryString = '';
    let localUrlParamsString = '';

    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        let category = obj.id.split('__');

        console.log('queryString for time', queryString);
        if (['store_type', 'commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        console.log('queryString 2 for time', queryString);

      }
    });
    //

    queryString = queryString.substring(0, queryString.length - 1);
    console.log('queryString 3 for time', queryString);

    if (queryString.includes('tesco_week=')) {
      if (queryString.includes('tesco_week=') && queryString.includes('date=')) {
        queryString = queryString.substring(0, 33);
        console.log('queryString with date', queryString);
      } else {
        queryString = queryString.substring(0, 17);
        console.log('queryString with week only', queryString);
      }
    } else {
      queryString = '';
    }
    // localStorage.setItem('weekParams', queryString);
    localStorage.setItem('weekParams', queryString);
    let a = localStorage.getItem('weekParams');
    console.log('aaa', a);
    this.props.onSaveWeek(queryString);

    // this.props.onGenerateUrlParamsString(queryString);
    // this.props.onCheckboxChange(queryString);
    this.props.ongenerateWeekFilter();


  };

  checkboxUpdate1 = (selection) => {

    let queryString = '';
    let queryString_without_week = '';
    let localUrlParamsString = '';

    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        let category = obj.id.split('__');
        console.log('queryString for product1', queryString);
        console.log('match', queryString.match(/tesco_week/gi));
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        console.log('queryString 2 for product1', queryString);
        // aa
        if (['store_type', 'commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        if (category[0] !== "tesco_week" && category[0] !== "date") {
          // alert(category[0])
          queryString_without_week = queryString_without_week + `${category[0]}=${category[category.length - 1]}&`;
        }
      }
    });
    //
    queryString = queryString.substring(0, queryString.length - 1);
    queryString_without_week = queryString_without_week.substring(0, queryString_without_week.length - 1);
    // alert(queryString_without_week);
    console.log('queryString 3 for product1', queryString_without_week);
    localStorage.setItem('urlParams', localUrlParamsString);
    this.props.onCheckboxWeekChange(queryString_without_week);
    this.props.onGenerateSideFilter();
  };

  applyButtonFunctionality = () => {
    // console.log('Raunaks Cascaded check', this.props);
    // let newUrl = this.props.location.pathname;
    //
    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        console.log('Cascaded applyButtonFunctionality'); //, obj);
        let category = obj.id.split('__');
        //console.log('queryString', queryString);
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });
    // //
    // queryString = queryString.substring(0, queryString.length - 1);
    //  console.log('queryString->', queryString);
    //const urlParams = this.props.location.query;
    this.props.ChartDataCall();
    this.props.CardsDataCall();
    this.props.loadKpi();
  };

  resetButtonFunctionality = () => {
    //To remove the parameters from the url
    let newUrl = this.props.location.pathname;
    const queryString = '';
    this.props.onGenerateUrlParamsString(queryString);

  };

  render() {
    return (

      <div className="row" ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">

              <PanelGroup defaultActiveKey="11" accordion>
                {(() => {
                  if (this.props.filter_data) {
                    console.log("Cascading filter - filter_data", this.props.filter_data);
                    return (

                      this.props.filter_data.checkbox_list.map((obj, key) => {
                        let panelHeader = (
                          <div key={Date.now() + Math.random() + Math.random() + 10}
                               className="text-capitalize">
                            {obj.title.replace(/_/g, ' ')}&nbsp;{obj.required ?
                            <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                            <span className="accordion-toggle" style={{float: 'right'}}></span>
                          </div>
                        );
                        if (!['store_type','brand_name','product'].includes(obj.title)) {
                          return (
                            <Panel header={panelHeader} eventKey={++key}>
                              <div className="panel text-capitalize"
                                   key={Date.now() + Math.random() + Math.random() + 10}>

                                <div className="panel-body style-7"
                                     style={{maxHeight: '250px', overflowX: 'hidden', fontSize: '9px'}}>
                                  {(() => {
                                    let finalCheckbox = [];

                                    {
                                      obj.items.map(obj2 => {
                                        finalCheckbox.push(
                                          <Checkbox id={obj.title + '__' + obj2.title}
                                                    label={obj2.title}
                                                    style={{fontSize: '10px'}}
                                                    checked={(() => {
                                                      if (obj2.selected) {
                                                        {/*alert()*/
                                                        }
                                                      }
                                                      return obj2.resource.selected
                                                    })()}
                                                    onChange={() => {

                                                      let previous_selection = this.props.previous_selection;
                                                      let selection = obj.title + "=" + obj2.title;

                                                      console.log('selection11', selection);
                                                      this.checkboxUpdate1(selection)
                                                    }}
                                            // checked={obj.resource.selected}
                                                    isDisabled={!obj2.highlighted}
                                                    valid={true}
                                                    key={Date.now() + Math.random()}
                                          />
                                        )
                                      })
                                    }

                                    // for replacing enabled to top
                                    let finalled = [];
                                    finalCheckbox.map(obj => {
                                      {/*console.log(obj.props.checked);*/
                                      }
                                      if (!obj.props.isDisabled) {
                                        finalled.push(obj)
                                      }
                                    });
                                    finalCheckbox.map(obj => {
                                      {/*console.log(obj.props.checked);*/
                                      }
                                      if (obj.props.isDisabled) {
                                        finalled.push(obj)
                                      }
                                    });
                                    return finalled

                                  })()}
                                </div>
                              </div>
                            </Panel>
                          )
                        }
                      })
                    )
                  }
                })()}
              </PanelGroup>


              <Modal show={this.state.alertShow} bsSize="sm" aria-labelledby="contained-modal-title-sm"
                     style={{marginTop: '10%'}}>

                <Modal.Header>
                  <Modal.Title id="contained-modal-title-sm"
                               style={{textAlign: 'center', fontSize: '18px'}}><span
                    style={{
                      textAlign: 'center',
                      fontSize: '14px'
                    }}><b> Mandatory Filter Selection Missing</b></span><span
                    style={{textAlign: 'right', float: 'right', marginTop: '1.1%'}}
                    onClick={() => this.setState({alertShow: false})}
                    className="glyphicon glyphicon-remove-sign"></span>
                    <div style={{textAlign: 'center'}}>
                      <div style={{textAlign: 'right'}}>
                      </div>
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <div className="row">
                    <div className="col-xs-12 alertMadatoryFilter" style={{fontSize: '14px', textAlign: 'center'}}>
                      {this.state.alertmsg}
                    </div>
                  </div>


                </Modal.Body>
                {/*<Modal.Footer>*/}
                {/*<Button*/}
                {/*onClick={() => {*/}
                {/*this.setState({alertShow: false})*/}
                {/*}}*/}
                {/*style={{display: 'block', margin: '0 auto'}}>Close</Button>*/}
                {/*</Modal.Footer>*/}
              </Modal>


              <div style={{textAlign: "center"}}>
                <Button
                  style={{marginTop: "5px", width: "10px"}}
                  onClick={() => {

                    let filterDataWeek = this.props.week;
                    let filterData = this.props.urlParamsString;
                    console.log('filterDataWeek', filterDataWeek);
                    console.log('filterData', filterData);
                    if (!(typeof(filterData) == "undefined")) {
                      console.log('tesco_weeek   filterDataWeek undefined ', filterDataWeek, filterData);
                      if (filterData.includes("buying_controller=")) {
                        console.log('tesco_weeek filterDataWeek', filterDataWeek);
                        console.log('--filterData', filterData);
                        this.props.DSViewKpiSpinnerCheck(0);
                        this.props.LineChartSpinnerCheck(0);
                        this.applyButtonFunctionality();
                      }
                      else {
                        console.log('modal open1');
                        this.setState({alertShow: true});
                      }
                    } else {
                      console.log('modal open2');
                      this.setState({alertShow: true});
                    }
                  }}>Apply</Button>
                <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
                <Button
                  style={{marginTop: "5px", width: "10px",}}
                  onClick={() => {
                    let selection = '';
                    localStorage.clear();
                    this.props.onCheckboxChange(selection);
                    this.props.onGenerateUrlParamsString(selection);
                    this.props.onCheckboxWeekChange(selection);
                    this.props.storeSelectionParams(storeSelection);
                    this.props.onSaveWeek(selection);
                    this.props.onSaveDateFilterParam(selection);

                    this.props.ChartDataCall();
                    this.props.CardsDataCall();
                    this.props.onGenerateSideFilter();
                    this.props.ongenerateWeekFilter();
                  }}>Clear Filters</Button>
              </div>
            </div>
          )
        })()};
      </div>


    );

  }
}

CascadedFilterDSS.propTypes = {};

export default CascadedFilterDSS;
