/**
 *
 * CascadedFilterNpd
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import {Modal} from 'react-bootstrap';
import {Accordion, PanelGroup, Panel} from 'react-bootstrap';
import styles from './style.scss';

class CascadedFilterNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    // console.log("----inside selector----",this.props);
    let selector = '';
    this.props.onGenerateSideFilter();

  };

  componentDidUpdate = () => {
    const urlParams = this.props.location.query;
    const tesco_week_value = '';
    this.props.onGenerateUrlParams(urlParams);
    this.props.onSendUrlParams(urlParams);
    this.props.onSaveWeek(tesco_week_value);
    // this.props.onCompetitorPieChart(urlParams);
    // this.props.onCompetitorPriceRange();
    // this.props.onCompWaterfall();
  };

  constructor(props) {
    super(props);
    this.state = {
      alertShow: false,
      alertmsg: "Please Select the Mandatory Filters (marked with star)."
    };

  }


  updateUrl = (category) => {
    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        console.log("Objects", obj);
        console.log("Objects category", category);
        let category = obj.id.split('__');
        // let category = category.split('__');

        // if (category[0] === 'buying_controller') {
        //   this.props.onGenerateBuyingController(category[category.length - 1])
        // }
        // if (category[1] === 'category_director') {
        //   // this.props.onGenerateBuyingController(category[category.length - 1])
        //   this.props.onGenerateCategoryDirector(category[category.length - 2])
        // }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });

    queryString = queryString.substring(0, queryString.length - 1);
    console.log('queryString for prod',queryString);
    queryString = queryString.substring(14, queryString.length);
    console.log('queryString for prod',queryString);


    this.props.onCheckboxChange(queryString);
    this.props.onGenerateSideFilter();
  };


  applyButtonFunctionality = () => {
    let newUrl = this.props.location.pathname;
    let x = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true)
        console.log('Cascaded applyButtonFunctionality', obj);
      let split = obj.id.split('__');

      x = x + split[1] + "=" + split[0] + "&";

    });
    //
    const queryString = x.substring(0, x.length - 1);
    console.log(queryString);
    const urlParams = this.props.location.query;
    this.props.onSaveWeek()
    this.props.onGenerateUrlParamsString(queryString);
    this.props.onCompetitorPieChart(urlParams);
    this.props.onCompetitorPriceRange();
    this.props.onCompWaterfall();
    this.props.onCompetitorOutperformance();

  };

  resetButtonFunctionality = () => {

    //To remove the parameters from the url
    let newUrl = this.props.location.pathname;

    const queryString = '';
    this.props.onGenerateUrlParamsString(queryString);

  }

  render() {
    // console.log("inside the cascaded filter",this.props.previous_selection)
    return (


      <div className="row" ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">
              <PanelGroup defaultActiveKey="0" accordion>
                {(() => {
                  if (this.props.week_data) {
                    console.log("Cascading filter - week", this.props.week_data);
                    var panelHeader = (

                      <div className="panel-heading">Tesco Week
                        <span style={{color: "red"}}>*</span>&nbsp;<span className="accordion-toggle" style={{
                          float: 'right',
                          marginRight: '-6%'
                        }}></span></div>
                    );
                    return (

                      <Panel header={panelHeader} eventKey="1">
                        <div className="panel selector">
                          <div className="panel-body style-7" style={{
                            maxHeight: '250px',
                            overflowX: 'hidden', fontSize: '9px'
                          }}>
                            {(() => {
                              console.log("Cascading filter ----------")
                              let finalCheckbox = [];
                              console.log('Cascading filter - week inside panel div', this.props.week_data);

                              {
                                this.props.week_data[0].items.map(obj2 => {
                                  console.log("Cascading Filter Inside map", obj2)
                                  finalCheckbox.push(
                                    <Checkbox id={obj2.name }
                                              label={obj2.name}
                                              style={{fontSize: '10px'}}
                                              checked={(() => {
                                                return obj2.selected;
                                              })()}
                                              onChange={() => {


                                                let previous_week_selection = this.props.previous_week_selection;
                                                let selection = "tesco_week=" + obj2.name;
                                                //For enabling un checking
                                                {
                                                  console.log('Cascaded Filter previous_week_selection', previous_week_selection);
                                                }
                                                {
                                                  console.log('Cascaded Filter selection', selection);
                                                }
                                                if (previous_week_selection == selection) {
                                                  selection = '';
                                                }


                                                this.props.onCheckboxWeekChange(selection);
                                                this.props.onSaveWeek(selection);
                                                this.props.onGenerateSideFilter();
                                              }}

                                              isDisabled={obj2.disabled}
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
                })()}
              </PanelGroup>
              <hr style={{
                marginTop: '0px',
                marginBottom: '-6%',
                border: '0',
                borderTop: '1px solid #eee',
              }}></hr>
              <PanelGroup defaultActiveKey="11" accordion>
                {(() => {
                  if (this.props.filter_data) {
                    console.log("Cascading filter - filter_data", this.props.filter_data);
                    return (

                      this.props.filter_data.map((obj, key) => {
                        let panelHeader = (
                          <div className="text-capitalize">
                            {obj.name.replace(/_/g, ' ')}&nbsp;{obj.required ?
                            <span style={{color: 'red'}}>*</span> : '' } &nbsp;
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
                                        <Checkbox id={obj.name  + '__' + obj2.name}
                                                  label={obj2.name}
                                                  style={{fontSize: '10px'}}
                                                  checked={(() => {
                                                    return obj2.selected
                                                  })()}
                                                  onChange={() => {

                                                    let previous_selection = this.props.previous_selection;
                                                    {/*let selection = obj.name + "=" + obj2.name;*/}
                                                    let selection = obj.name + "__" + obj2.name;
                                                    //For enabling un checking

                                                    if (previous_selection == selection) {
                                                      selection = '';
                                                    }
                                                    console.log('obj for comp', obj);
                                                    console.log('obj2 for comp', obj2);
                                                    let abc = obj.name+"__"+obj2.name;
                                                    console.log('obj3 for comp', abc);

                                                    this.updateUrl(selection)


                                                    {/*this.updateUrl(obj.name+"__"+obj2.name)*/}
                                                    {/*this.props.onCheckboxChange(selection);*/}
                                                    {/*this.props.onGenerateSideFilter();*/}
                                                  }}
                                                  isDisabled={obj2.disabled}
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

              <Modal show={this.state.alertShow} bsSize="sm" aria-labelledby="contained-modal-title-sm" style={{marginTop: '10%'}}>
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-sm"
                               style={{textAlign: 'center', fontSize: '18px'}}><span
                    style={{textAlign: 'center', fontSize: '14px'}}><b>Mandatory Filter Selection Missing</b></span><span
                    style={{textAlign: 'right', float: 'right', marginTop: '1.1%'}}
                    onClick={() => this.setState({alertShow: false})}  className="glyphicon glyphicon-remove-sign"></span>
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


              <Button
                style={{marginTop: "5px", marginLeft: "48px", width: "10px", "min-width": "170px", fontSize: "13px"}}
                onClick={() => {

                  let filterDataWeek = this.props.filter_week_selection;
                  let filterData = this.props.filter_selection;
                  console.log('filterDataWeek', filterDataWeek);
                  if (!(typeof(filterDataWeek) == "undefined") && !(typeof(filterData) == "undefined")) {
                    console.log('tesco_weeek   filterDataWeek undefined ', filterDataWeek,filterData);
                    if (filterDataWeek.includes("tesco_week") && filterData.includes("buying_controller")) {
                      console.log('tesco_weeek filterDataWeek', filterDataWeek);
                      console.log('--filterData', filterData);
                      this.props.onPieChartSpinnerSuccess(0);
                      this.props.outPerformanceChartSuccess(0);
                      this.props.waterChartAsdaSuccess(0);
                      this.props.priceRangeChartSuccess(0);

                      this.applyButtonFunctionality();
                    }
                    else {
                      console.log('modal open');
                      this.setState({alertShow: true});
                  }
                  } else {
                    console.log('modal open');
                    this.setState({alertShow: true});
                  }
                }}>Apply Filters</Button>

              <Button
                style={{marginTop: "5px", marginLeft: "48px", width: "10px", "min-width": "170px", fontSize: "13px"}}
                onClick={() => {
                  //To un check all the buttons
                  let selection = '';
                  this.props.onCheckboxChange(selection);
                  this.props.onGenerateSideFilter();

                  {/*this.resetButtonFunctionality();*/
                  }

                }}>Clear Filters</Button>

              {/*<Button style={{marginTop: "5px", marginLeft: "48px", width: "10px", "min-width": "170px", fontSize: "13px"}}*/}
              {/*onClick={() => {*/}
              {/*To un check all the buttons*/}
              {/*let selection='';*/
              }
              {/*this.props.onCheckboxChange(selection);*/
              }
              {/*this.props.onGenerateSideFilter();*/
              }

              {/*this.resetButtonFunctionality();*/}

              {/*}}>Load Default view</Button>*/}
            </div>
          )
        })()}
      </div>


    );
  }
}

CascadedFilterNpd.propTypes = {};

export default CascadedFilterNpd;
