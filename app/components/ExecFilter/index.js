/**
*
* ExecFilter
*
*/


import React from 'react';
import Checkbox from 'components/checkbox';
import RadioButton from 'components/radio_button';
import {Accordion,PanelGroup, Panel} from 'react-bootstrap';
import Button from 'components/button';
import styles from './style.scss';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ExecFilter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  updateUrl = (category) => {
    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        console.log("Objects",obj);
        let category = obj.id.split('__');


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
    // alert(queryString);
    // APPEND URL PARAMS
    // this.props.onGenerateUrlParamsString(queryString);
    // this.props.onGenerateUrlParamsData();
    this.props.onGenerateUrlParamsString(queryString);
    this.props.generateSideFilter();
    // this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
  };

  componentDidMount = () => {

    // this.props.onGenerateUrlParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateFilterParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateTable();
  };

  componentDidUpdate = () => {


    // this.props.onGenerateTable();
  };



  render() {
    return (
      <div ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">


              <PanelGroup defaultActiveKey="0" accordion>
                {(() => {
                  if (this.props.week_data) {
                    console.log("Cascading filter - week", this.props.week_data);
                    var panelHeader = (

                      <div className="panel-heading">Tesco Week
                        <span style={{color: "red"}}>*</span>&nbsp;
                        <span className="accordion-toggle" style={{float: 'right', marginRight: '-6%'}}></span>
                      </div>
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
                                  {/*console.log("Cascading Filter Inside map", obj2)*/}
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



                                                this.props.onSaveWeekFilterParam(selection);
                                                this.props.ongenerateWeekFilter();
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
              {/*<div id="style-7" style={{*/}
              {/*height: '52%',*/}
              {/*width: '19%',*/}
              {/*position: 'fixed',*/}
              {/*overflow: 'scroll',*/}
              {/*paddingRight: '5px',*/}
              {/*overflowX: 'hidden',*/}
              {/*borderTop: '1px solid #ccc',*/}
              {/*}}>*/}

              <PanelGroup defaultActiveKey="1" accordion>
                {this.props.sideFilter.checkbox_list.map((item, key) => {
                  let panelHeader = (
                    <div  className="text-capitalize">
                      {item.title.replace(/_/g, ' ')}&nbsp;{item.required ? <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                      <span className="accordion-toggle" style={{float: 'right'}}></span>
                    </div>
                  );
                  return (
                    <Panel header={panelHeader} eventKey={++key}>
                      <div className="panel selector">
                        {/*<div className="panel-heading">*/}
                        {/*<input type="text" value={this.props.filterSearch}*/}
                        {/*onChange={(e) => {*/}
                        {/*// console.log(e);*/}
                        {/*let search = e.target.value.toLowerCase();*/}
                        {/*if (!search) return*/}

                        {/*let parent = e.target.parentNode;*/}
                        {/*while (parent.classList.contains('selector')) {*/}
                        {/*parent = parent.parentNode;*/}
                        {/*}*/}
                        {/*parent = parent.parentNode;*/}
                        {/*let inputText = parent.querySelectorAll(`input[name*=${search}]`);*/}
                        {/*// console.log(inputText);*/}

                        {/*// inputText.map(obj=>{*/}
                        {/*//   obj.setAttribute('hidden')*/}
                        {/*// })*/}

                        {/*// for (let i = 0; i < inputText.length; i++) {*/}
                        {/*//   inputText[i].setAttribute("hidden", true)*/}
                        {/*// }*/}
                        {/*}}/>*/}
                        {/*</div>*/}
                        <div className="panel-body style-7"
                             style={{maxHeight: '250px', overflowX: 'hidden'}}>
                          {item.items.map(obj => {
                            if (obj.highlighted) {
                              if (item.input_type == 'RadioButton') {
                                return <RadioButton id={item.id + '__' + item.category_director + '__' + obj.title}
                                                    label={obj.title}
                                                    valid={true}
                                                    key={item.id + '__' + obj.title}
                                                    name={obj.title.toLowerCase() }
                                                    onChange={() => {
                                                      this.updateUrl(item.id)
                                                    }}
                                                    checked={obj.resource.selected}
                                                    isDisabled={!obj.highlighted}
                                />
                              }
                              return <Checkbox style="font-size:12px;" id={item.id + '__' + item.category_director + '__' + obj.title}
                                               label={obj.title}
                                               valid={true}
                                               key={item.id + '__' + obj.title}
                                               name={obj.title.toLowerCase()}
                                               onChange={() => {
                                                 this.updateUrl(item.id)
                                               }}
                                               checked={obj.resource.selected}
                                               isDisabled={!obj.highlighted}
                              />
                            }
                          })}
                          <hr/>
                          {item.items.map(obj => {
                            if (!obj.highlighted) {
                              if (item.input_type == 'RadioButton') {
                                return <RadioButton id={item.id + '__' + item.category_director + '__' + obj.title}
                                                    label={obj.title}
                                                    valid={true}
                                                    key={item.id + '__' + obj.title}
                                                    name={obj.title.toLowerCase() }
                                                    onChange={() => {
                                                      this.updateUrl(item.id)
                                                    }}
                                                    checked={obj.resource.selected}
                                                    isDisabled={!obj.highlighted}
                                />
                              }
                              return <Checkbox  style="font-size:12px,width:230px;" id={item.id + '__' + item.category_director + '__' + obj.title}
                                                label={obj.title} valid={true}
                                                key={item.id + '__' + obj.title}
                                                name={obj.title.toLowerCase() }
                                                onChange={() => {
                                                  this.updateUrl(item.category_director)
                                                }}
                                                checked={obj.resource.selected}
                                                isDisabled={!obj.highlighted}
                              />
                            }
                          })}
                        </div>
                      </div>
                    </Panel>
                  )
                })}
              </PanelGroup>
              <div className="text-center">
                <Button onClick={() => {

               {/*Load functions here*/}
                  if (this.props.kpi_param=='kpi_type=Overview') {
                    console.log("______________________ Only Overview function Called")
                    this.props.loadOverviewKpi();
                    this.props.loadOverviewKpiTrend();
                    this.props.loadOverviewDriversInternal();
                    this.props.loadOverviewDriversExternal();
                    this.props.loadRolesAndIntent();
                    this.props.loadBudgetAndForecast();
                  }
                  else {
                    if(this.props.kpi_param=='kpi_type=Price')
                    {
                      console.log("______________________ Only Price function Called")
                      this.props.loadPriceKPIData();


                    }

                    else {
                      console.log("______________________ Only KPI functions Called")


                      this.props.loadKpiBoxes();
                      this.props.loadBestWorst();
                      this.props.loadDriversInternalData();
                      this.props.loadDriversExternalData();
                    }

                  }
                }}>Apply</Button>
                <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
                <Button onClick={() => {
                  let  selection = '';
                  this.props.onSaveWeekFilterParam(selection);
                  this.props.ongenerateWeekFilter();
                  let queryString='';
                  this.props.onGenerateUrlParamsString(queryString);
                  this.props.generateSideFilter();

                }}>Reset</Button>
                <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
                <Button onClick={() => {
                  let  selection = '';
                  this.props.onSaveWeekFilterParam(selection);
                  this.props.ongenerateWeekFilter();
                  let queryString='';
                  this.props.onGenerateUrlParamsString(queryString);
                  this.props.generateSideFilter();
                  if (this.props.kpi_param=='kpi_type=Overview') {
                    console.log("______________________ Only Overview function Called")
                    this.props.loadOverviewKpi();
                    this.props.loadOverviewKpiTrend();
                    this.props.loadOverviewDriversInternal();
                    this.props.loadOverviewDriversExternal();

                  }
                  else {
                    if(this.props.Executive.kpi_param=='kpi_type=Price')
                    {
                      console.log("______________________ Only Price function Called")
                      this.props.loadPriceKPIData();


                    }

                    else {
                      console.log("______________________ Only KPI functions Called")
                      this.props.loadRolesAndIntent();
                      this.props.loadBudgetAndForecast();

                      this.props.loadKpiBoxes();
                      this.props.loadBestWorst();
                      this.props.loadBestInfoData();

                      this.props.loadWorstInfoData();
                      this.props.loadSupplierInfoData();
                      this.props.loadDriversInternalData();
                      this.props.loadDriversExternalData();
                    }

                  }




                }}>Load default</Button></div>
              {/*<Button onClick={() => {*/}
              {/*/!*this.props.onFilterReset();*!/*/}
              {/*}}>Reset Filters</Button>&nbsp;&nbsp;*/}
            </div>
          )
        })()}
      </div>
    );
  }
}

ExecFilter.propTypes = {

};

export default ExecFilter;
