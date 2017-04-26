/**
 *
 * CascadedFilterNpd
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
class CascadedFilterNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    // console.log("----inside selector----",this.props);
    let selector='';
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
      <div>

        <div className="row" ref={'selector'}>
          <div className="col-xs-12">
            {(() => {
              if (this.props.week_data) {
                console.log("Cascading filter - week", this.props.week_data);
                return (

                  <div className="panel text-capitalize">
                    {/*<div className="panel-heading">*/}
                    {/*{obj.name}*/}
                    {/*</div>*/}
                    <div className="panel-heading"
                         style={{
                           fontWeight: '700',
                           fontSize: '16px',
                           borderBottom: '1px solid #ddd'
                         }}>Tesco Week
                      <span style={{color: "red"}}>*</span></div>

                    <div className="panel-body" style={{
                      maxHeight: '250px',
                      overflowX: 'scroll', overflowX: 'hidden'
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
                                          let selection =  "tesco_week=" + obj2.name;
                                          //For enabling un checking
                                          {console.log('Cascaded Filter previous_week_selection',previous_week_selection);
                                          }
                                          {console.log('Cascaded Filter selection',selection);
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


                )
              }
            })()}


            {(() => {
              if (this.props.filter_data) {
                console.log("Cascading filter - filter_data", this.props.filter_data);
                return (

                  this.props.filter_data.map(obj => {
                    return (
                      <div className="panel text-capitalize" key={Date.now() + Math.random()}>
                        {/*<div className="panel-heading">*/}
                        {/*{obj.name}*/}
                        {/*</div>*/}
                        <div className="panel-heading"
                             style={{
                               fontWeight: '700',
                               fontSize: '16px',
                               borderBottom: '1px solid #ddd'
                             }}>{obj.name.replace(/_/g, ' ')} <span style={{color: "red"}}>*</span></div>

                        <div className="panel-body"
                             style={{maxHeight: '250px', overflowX: 'scroll', overflowX: 'hidden'}}>
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
                    )
                  })
                )
              }
            })()}


          </div>
        </div>

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


    );
  }
}

CascadedFilterNpd.propTypes = {};

export default CascadedFilterNpd;
