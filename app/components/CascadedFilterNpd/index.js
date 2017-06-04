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
    // this.props.onGenerateSideFilter();

  };

  componentDidUpdate = () => {
    const urlParams = this.props.location.query;
    const tesco_week_value = '';
    // this.props.onGenerateUrlParams(urlParams);
    // this.props.onSendUrlParams(urlParams);
    // this.props.onSaveWeek(tesco_week_value);
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
    let queryStringNew = '';
    let urlParamsSingleSelect = '';

    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {

        let categoryNew = obj.id.split('__');
        // let category = category.split('__');

        console.log('obj11', categoryNew);

        // let categoryNew = category.split('__');
        // console.log('categoryNew',categoryNew);

        queryStringNew = queryStringNew + `${categoryNew[0]}=${categoryNew[categoryNew.length - 1]}&`;
        console.log('queryStringNew1', queryStringNew);

      }
    })

    if (queryStringNew.includes('20')) {
      queryStringNew = queryStringNew.substring(14, queryStringNew.length - 1);
      console.log('queryStringNew2', queryStringNew);
    }

    this.props.user_filter_selection(queryStringNew);

    if (['commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
      urlParamsSingleSelect = category;
      // urlParamsSingleSelect = urlParamsSingleSelect + `${category[0]}=${category[category.length - 1]}`;
    }
    queryString = queryString + `${category[0]}=${category[category.length - 1]}`;
    // }
    // });

    queryString = queryString.substring(0, queryString.length - 1);
    console.log('queryString for prod', queryString);
    // queryString = queryString.substring(14, queryString.length);
    // console.log('queryString for prod', queryString);
    console.log('urlParamsSingleSelect--', urlParamsSingleSelect);

    // this.props.onCheckboxChange(queryString);
    this.props.onCheckboxChange(category);
    this.props.onGenerateSideFilter();

    if (category.includes("commercial_name") || category.includes("category_name")) {

    }
    else {
      localStorage.setItem('urlParamsSingleSelect', category);
    }
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
    this.props.defaultGreyScreen(0);
  };

  resetButtonFunctionality = () => {

    //To remove the parameters from the url
    let newUrl = this.props.location.pathname;

    const queryString = '';
    this.props.onGenerateUrlParamsString(queryString);

  }

  render() {
    // console.log("inside the cascaded filter",this.props.previous_selection)
    let pHierarchyFilterCheck = true;
    let weekFilterCheck = true;
    return (


      <div ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">

              <hr style={{
                marginTop: '0px',
                marginBottom: '-1%',
                border: '0',
                borderTop: '1px solid #eee',
              }}></hr>

              <PanelGroup defaultActiveKey="11" accordion>
                {(() => {
                  if (this.props.filter_data) {
                    return (

                      this.props.filter_data.map((obj, key) => {
                        let panelHeader = (
                          <div className="text-capitalize">
                            {obj.name.replace(/_/g, ' ')}&nbsp;{obj.required ?
                            <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                            <span className="accordion-toggle" style={{float: 'right'}}></span>
                          </div>
                        );
                        if (obj.title !== 'store_type') {
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
                                          <Checkbox id={obj.name + '__' + obj2.name}
                                                    label={obj2.name}
                                                    style={{fontSize: '10px'}}
                                                    checked={(() => {
                                                      return obj2.selected
                                                    })()}
                                                    onChange={() => {

                                                      let previous_selection = this.props.previous_selection;
                                                      let selection = obj.name + "=" + obj2.name;

                                                      {/*let selection = obj.name + "__" + obj2.name;*/
                                                      }
                                                      //For enabling un checking

                                                      if (previous_selection == selection) {
                                                        selection = '';
                                                      }
                                                      console.log('previous_selection--', previous_selection);
                                                      console.log('selection--', selection);

                                                      this.updateUrl(selection)


                                                      {/*this.updateUrl(obj.name+"__"+obj2.name)*/
                                                      }
                                                      {/*this.props.onCheckboxChange(selection);*/
                                                      }
                                                      {/*this.props.onGenerateSideFilter();*/
                                                      }
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
                    }}><b>Mandatory Filter Selection Missing</b></span><span
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


              <Button
                style={{marginTop: "5px", marginLeft: "48px", width: "10px"}}
                onClick={() => {
                  pHierarchyFilterCheck = false;
                  for (let i = 0; i < this.props.filter_data[0].items.length; i++) {
                    if (this.props.filter_data[2].items[i].selected == true) {
                      console.log("Cascading filter - filter_data2 for loop", this.props.filter_data[0].items[i].selected);
                      pHierarchyFilterCheck = true;
                      console.log('pHierarchyFilterCheck11', pHierarchyFilterCheck);
                    } else {
                      pHierarchyFilterCheck = false;
                      console.log('pHierarchyFilterCheck22', pHierarchyFilterCheck);
                    }
                  }
                  weekFilterCheck = false;
                  for (let i = 0; i < this.props.week_data[0].items.length; i++) {
                    if (this.props.week_data[0].items[i].selected == true) {
                      console.log("Cascading filter - 1week_data1 for loop", this.props.week_data[0]);
                      console.log("Cascading filter - week_data1 for loop", this.props.week_data[0].items[i].selected);
                      weekFilterCheck = true;
                      console.log('weekFilterCheck11', weekFilterCheck);
                    } else {
                      {/*weekFilterCheck = false;*/
                      }
                      console.log('weekFilterCheck22', weekFilterCheck);
                      console.log("Cascading filter - week_data false for loop", this.props.week_data[0].items[i].name);
                    }
                  }
                  if (pHierarchyFilterCheck && weekFilterCheck) {
                    this.props.onPieChartSpinnerSuccess(0);
                    this.props.outPerformanceChartSuccess(0);
                    this.props.waterChartAsdaSuccess(0);
                    this.props.priceRangeChartSuccess(0);
                    this.applyButtonFunctionality();
                  } else {
                    this.setState({alertShow: true});
                  }

                }}>Apply</Button>
              <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
              <Button
                style={{marginTop: "5px", marginLeft: "48px", width: "10px"}}
                onClick={() => {
                  //To un check all the buttons
                  let selection = '';
                  this.props.onCheckboxChange(selection);
                  this.props.onGenerateSideFilter();

                  this.props.defaultGreyScreen(1);

                }}>Clear Filters</Button>

            </div>
          )
        })()}

      </div>


    );
  }
}

CascadedFilterNpd.propTypes = {};

export default CascadedFilterNpd;
