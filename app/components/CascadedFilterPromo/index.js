/**
 *
 * CascadedFilterPromo
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import {Accordion, PanelGroup, Panel} from 'react-bootstrap';
import styles from './style.scss';

class CascadedFilterPromo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
            <div id="style-7" style={{
              height: '90%',
              width: '21%',
              position: 'fixed',
              /* padding-right: 5px; */
              overflowX: 'hidden',
              overflowY: 'scroll',
              borderTop: '1px solid #ccc',
            }}>
              <PanelGroup defaultActiveKey="0" accordion>
                {(() => {
                  if (this.props.week_data) {
                    console.log("Cascading filter - week", this.props.week_data);
                    var panelHeader = (

                      <div className="panel-heading">Tesco Week
                        <span style={{color: "red"}}>*</span>&nbsp;<span className="accordion-toggle" style={{float: 'right', marginRight: '-6%'}}></span></div>
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
                                        <Checkbox id={obj2.name + '__' + obj.name}
                                                  label={obj2.name}
                                                  style={{fontSize: '10px'}}
                                                  checked={(() => {
                                                    return obj2.selected
                                                  })()}
                                                  onChange={() => {

                                                    let previous_selection = this.props.previous_selection;
                                                    let selection = obj.name + "=" + obj2.name;
                                                    //For enabling un checking
                                                    {/*console.log('previous_selection',previous_selection);*/
                                                    }
                                                    {/*console.log('selection',selection);*/
                                                    }
                                                    if (previous_selection == selection) {
                                                      selection = '';
                                                    }
                                                    this.props.onCheckboxChange(selection);
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
                      })
                    )
                  }
                })()}
              </PanelGroup>


              <Button style={{marginTop: "5px", width: "10px", "min-width": "170px", fontSize: "13px"}}
                      onClick={() => {

                        this.applyButtonFunctionality();

                      }}>Apply Filters</Button>

              <Button style={{marginTop: "5px", width: "10px", "min-width": "170px", fontSize: "13px"}}
                      onClick={() => {
                        //To un check all the buttons
                        let selection = '';
                        this.props.onCheckboxChange(selection);
                        this.props.onGenerateSideFilter();

                        {/*this.resetButtonFunctionality();*/
                        }

                      }}>Clear Filter Selections</Button>

              <Button style={{marginTop: "5px", width: "10px", "min-width": "170px", fontSize: "13px"}}
                      onClick={() => {
                        //To un check all the buttons
                        {/*let selection='';*/
                        }
                        {/*this.props.onCheckboxChange(selection);*/
                        }
                        {/*this.props.onGenerateSideFilter();*/
                        }

                        this.resetButtonFunctionality();

                      }}>Load Default view</Button>
            </div>
          )
        })()}
      </div>


    );
  }
}

CascadedFilterPromo.propTypes = {};

export default CascadedFilterPromo;
