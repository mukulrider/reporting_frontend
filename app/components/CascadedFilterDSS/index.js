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
    let selector = '';
  };

  componentDidUpdate = () => {

  };

  checkboxUpdate = (selection) => {

    let newUrl = this.props.location.pathname;

    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true){
        let category = obj.id.split('__');

        console.log('queryString for time',queryString);
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        console.log('queryString 2 for time',queryString);

      }
    });
    //
    queryString = queryString.substring(0, queryString.length - 1);
    console.log('queryString 3 for time',queryString);
    this.props.onSaveWeek(queryString);
    // this.props.onGenerateUrlParamsString(queryString);
    // this.props.onCheckboxChange(queryString);
    this.props.ongenerateWeekFilter();


  };

  checkboxUpdate1 = (selection) => {
    console.log('Cascaded check', this.props);
    let newUrl = this.props.location.pathname;

    let queryString = '';
    let queryString_without_week = '';
    let queryString_for_week_date = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true){

        let category = obj.id.split('__');

        console.log('queryString for product1',queryString);
        console.log('match',queryString.match(/tesco_week/gi));

        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        console.log('queryString 2 for product1',queryString);

        // aa

        if(category[0]!=="tesco_week"&& category[0]!=="date"){
          alert(category[0])
          queryString_without_week = queryString_without_week + `${category[0]}=${category[category.length - 1]}&`;

        }
      }
    });
    //
    queryString = queryString.substring(0, queryString.length - 1);
    queryString_without_week = queryString_without_week.substring(0, queryString_without_week.length - 1);
    alert(queryString_without_week);
    console.log('queryString 3 for product1',queryString_without_week);



    this.props.onCheckboxWeekChange(queryString_without_week);
    this.props.onGenerateSideFilter();

  };

  applyButtonFunctionality = () => {
    // console.log('Raunaks Cascaded check', this.props);
    // let newUrl = this.props.location.pathname;
    //
    // let queryString = '';
    // [...this.refs.selector.querySelectorAll('input')].map(obj => {
    //   if (obj.checked == true)
    //     console.log('Cascaded applyButtonFunctionality'); //, obj);
    //   let category = obj.id.split('__');
    //   //console.log('queryString', queryString);
    //   queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
    //
    //
    // });
    // //
    // queryString = queryString.substring(0, queryString.length - 1);
    //  console.log('queryString->', queryString);
    //const urlParams = this.props.location.query;
    // this.props.onSaveWeek();
    // this.props.onGenerateUrlParamsString(queryString);
    this.props.DefaultLineChartCall();
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
                                                    return obj2.resource.selected;
                                                  })()}
                                                  onChange={() => {

                                                    let previous_selection = this.props.previous_selection;
                                                    let selection = obj.title + "=" + obj2.title;

                                                    console.log('selection for product', selection);
                                                    this.checkboxUpdate(selection);
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
                            {obj.title.replace(/_/g, ' ')}&nbsp;{obj.required ? <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                            <span className="accordion-toggle" style={{float: 'right'}}></span>
                          </div>
                        );
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
                                                      {/*alert()*/}
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
                      })
                    )
                  }
                })()}
              </PanelGroup>
              <div style={{textAlign:"center"}}>
                <Button
                  style={{marginTop: "5px", width: "10px", minWidth: "170px", fontSize: "13px"}}
                  onClick={() => {

                    this.DSViewKpiSpinnerCheck(0);
                    this.LineChartSpinnerCheck(0);
                    this.applyButtonFunctionality();
                  }}>Apply Filters</Button>
                <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
                <Button
                  style={{marginTop: "5px", width: "10px", minWidth: "170px", fontSize: "13px"}}
                  onClick={() => {
                    //To un check all the buttons
                    let selection = '';
                    this.props.onCheckboxChange(selection);
                    this.props.onGenerateSideFilter();
                  }}>Clear filters</Button>
              </div>
            </div>
          )
        })()}
      </div>


    );
  }
}

CascadedFilterDSS.propTypes = {};

export default CascadedFilterDSS;
