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
import styles from './style.scss';

class CascadedFilterDSS extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    // console.log("----inside selector----",this.props);
    let selector = '';
    // this.props.onGenerateSideFilter();

  };

  componentDidUpdate = () => {
    // const urlParams = this.props.location.query;
    // const tesco_week_value = '';
    // this.props.onGenerateUrlParams(urlParams);
    // this.props.onSendUrlParams(urlParams);
    // this.props.onSaveWeek(tesco_week_value);
    // this.props.onCompetitorPieChart(urlParams);
    // this.props.onCompetitorPriceRange();
    // this.props.onCompWaterfall();
  };

  checkboxUpdate = (selection) => {
    console.log('Raunaks Cascaded check', this.props);
    let newUrl = this.props.location.pathname;

    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true){
        console.log('Cascaded applyButtonFunctionality'); //, obj);
      let category = obj.id.split('__');
      //console.log('queryString', queryString);
      queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;

      }
    });
    //
    queryString = queryString.substring(0, queryString.length - 1);
    //  console.log('queryString->', queryString);
    this.props.onSaveWeek(queryString);
    // this.props.onGenerateUrlParamsString(queryString);
    // this.props.DefaultLineChartCall();
    // this.props.onCheckboxChange(queryString);
    this.props.ongenerateWeekFilter();


  };

  applyButtonFunctionality = () => {
    console.log('Raunaks Cascaded check', this.props);
    let newUrl = this.props.location.pathname;

    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true)
        console.log('Cascaded applyButtonFunctionality'); //, obj);
      let category = obj.id.split('__');
      //console.log('queryString', queryString);
      queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;


    });
    //
    queryString = queryString.substring(0, queryString.length - 1);
    //  console.log('queryString->', queryString);
    //const urlParams = this.props.location.query;
    this.props.onSaveWeek();
    this.props.onGenerateUrlParamsString(queryString);
    this.props.DefaultLineChartCall();
    // this.props.onCompetitorPieChart(urlParams);
    // this.props.onCompetitorPriceRange();
    // this.props.onCompWaterfall();


  };

  resetButtonFunctionality = () => {

    //To remove the parameters from the url
    let newUrl = this.props.location.pathname;

    const queryString = '';
    this.props.onGenerateUrlParamsString(queryString);

  };

  render() {
    // console.log("inside the cascaded filter",this.props.previous_selection)
    return (


      <div className="row" ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">

              <PanelGroup defaultActiveKey="11" accordion>
                {(() => {
                  if (this.props.week_data) {
                    console.log("Cascading filter - filter_data", this.props.week_data);
                    return (

                      this.props.week_data.checkbox_list.map((obj, key) => {
                        let panelHeader = (
                          <div className="text-capitalize">
                            {obj.title.replace(/_/g, ' ')}&nbsp;<span style={{color: "red"}}>*</span>&nbsp;
                            <span className="accordion-toggle" style={{float: 'right'}}></span>
                          </div>
                        );
                        return (
                          <Panel header={panelHeader} eventKey={++key}>
                            {/*<div className="panel-heading">*/}
                            {/*{obj.name}*/}
                            {/*</div>*/}
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
                                                      {/*alert()*/}
                                                    }
                                                    return obj2.resource.selected
                                                  })()}
                                                  onChange={() => {

                                                    let previous_selection = this.props.previous_selection;
                                                    let selection = obj.title + "=" + obj2.title;
                                                    {/*alert(selection)*/
                                                    }
                                                    //For enabling un checking
                                                    {/*console.log('previous_selection',previous_selection);*/
                                                    }
                                                    {/*console.log('selection',selection);*/
                                                    }
                                                    {/*if (previous_selection == selection) {*/
                                                    }
                                                    {/*selection = '';*/
                                                    }
                                                    {/*}*/
                                                    }
                                                    console.log('selection', selection);
                                                    this.checkboxUpdate(selection);
                                                    this.props.ongenerateWeekFilter();
                                                  }}
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
                      })
                    )
                  }
                })()}
              </PanelGroup>

              <PanelGroup defaultActiveKey="11" accordion>
                {(() => {
                  if (this.props.filter_data) {
                    console.log("Cascading filter - filter_data", this.props.filter_data);
                    return (

                      this.props.filter_data.checkbox_list.map((obj, key) => {
                        let panelHeader = (
                          <div className="text-capitalize">
                            {obj.title.replace(/_/g, ' ')}&nbsp;<span style={{color: "red"}}>*</span>&nbsp;
                            <span className="accordion-toggle" style={{float: 'right'}}></span>
                          </div>
                        );
                        return (
                          <Panel header={panelHeader} eventKey={++key}>
                            {/*<div className="panel-heading">*/}
                            {/*{obj.name}*/}
                            {/*</div>*/}
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
                                                      {/*alert()*/}
                                                    }
                                                    return obj2.resource.selected
                                                  })()}
                                                  onChange={() => {

                                                    let previous_selection = this.props.previous_selection;
                                                    let selection = obj.title + "=" + obj2.title;
                                                    {/*alert(selection)*/
                                                    }
                                                    //For enabling un checking
                                                    {/*console.log('previous_selection',previous_selection);*/
                                                    }
                                                    {/*console.log('selection',selection);*/
                                                    }
                                                    {/*if (previous_selection == selection) {*/
                                                    }
                                                    {/*selection = '';*/
                                                    }
                                                    {/*}*/
                                                    }
                                                    this.props.onCheckboxWeekChange(selection);
                                                    this.props.onGenerateSideFilter();
                                                    console.log('selection', selection);
                                                    {/*this.checkboxUpdate(selection)*/}
                                                  }}
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
                      })
                    )
                  }
                })()}
              </PanelGroup>

              <Button
                style={{marginTop: "5px", width: "10px", minWidth: "170px", fontSize: "13px", textAlign: "center"}}
                onClick={() => {

                  this.applyButtonFunctionality();

                }}>Apply Filters</Button>

              <Button
                style={{marginTop: "5px", width: "10px", minWidth: "170px", fontSize: "13px", textAlign: "center"}}
                onClick={() => {
                  //To un check all the buttons
                  let selection = '';
                  this.props.onCheckboxChange(selection);
                  this.props.onGenerateSideFilter();

                  {/*this.resetButtonFunctionality();*/
                  }

                }}>Clear Filter Selections</Button>


            </div>
          )
        })()}
      </div>


    );
  }
}

CascadedFilterDSS.propTypes = {};

export default CascadedFilterDSS;
