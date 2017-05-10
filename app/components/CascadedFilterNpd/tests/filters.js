/**
 *
 * CascadedFilterNpd
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import {browserHistory} from 'react-router';
import {Accordion,PanelGroup, Panel} from 'react-bootstrap';
import styles from './style.scss';


class CascadedFilterNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    // console.log("----inside selector----",this.props);
    this.props.onGenerateSideFilter();

  };

  componentDidUpdate = () => {

    const urlParams = this.props.location.query;
    this.props.onGenerateUrlParams(urlParams);
    this.props.onSendUrlParams(urlParams);

    this.props.onUnmatchedProdTable();
    this.props.onSkuChartFetch();
    this.props.onOutPerformanceChartFetch();
    this.props.onPriceGravityFetch();




  };



  applyButtonFunctionality = () => {

    let newUrl = this.props.location.pathname;
    let x = '';
    //
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {

        let split=obj.id.split('__');

        x = x + split[1]+"="+split[0]+"&";

      }
    });
    //
    const queryString = x.substring(0, x.length - 1);
    // console.log(queryString);
    this.props.onGenerateUrlParamsString(queryString);

    //   console.log("-=-=-==-==-=-=",queryString)
    //   browserHistory.push(newUrl + '?' + queryString);

    if (this.props.dataPageUrlParams!==''&& this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+"&"+queryString+"&"+this.props.dataPageUrlParams);
    } else if (this.props.dataPageUrlParams!==''|| this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+this.props.dataPageUrlParams+"&"+queryString);
    }
    else{
      browserHistory.push(newUrl + '?' + queryString);
    }


  };

  resetButtonFunctionality = () => {


//To remove the parameters from the url
    let newUrl = this.props.location.pathname;

    const queryString ='';
    this.props.onGenerateUrlParamsString(queryString);
    if (this.props.dataPageUrlParams!==''&& this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+"&"+queryString+"&"+this.props.dataPageUrlParams);
    } else if (this.props.dataPageUrlParams!==''|| this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+this.props.dataPageUrlParams+"&"+queryString);
    }
    else{
      browserHistory.push(newUrl);
    }



  }

  render() {
    // console.log("inside the cascaded filter",this.props.previous_selection)
    return (
      <div ref={'selector'}>

        {(() => {
          return (
            <div id="style-7" style={{
              height: '90%',
              width: '21%',
              position: 'fixed',
              /* padding-right: 5px; */
              overflowX: 'hidden',
              overflowY: 'scroll' ,
              borderTop: '1px solid #ccc',
            }}>

              {/*<div className="row" ref={'selector'}>*/}
              {/*<div className="col-xs-12">*/}

              <PanelGroup defaultActiveKey="1" accordion>
                {(() => {

                  if (this.props.sideFilter) {
                    return (
                      this.props.sideFilter.map((obj,key) => {
                        let panelHeader = (
                          <div  className="text-capitalize">
                            {obj.name.replace(/_/g, ' ')}&nbsp;<span style={{color:"red"}}>*</span>&nbsp;
                            <span className="accordion-toggle" style={{float: 'right'}}></span>
                          </div>
                        );
                        return (
                          <Panel header={panelHeader} eventKey={++key}>
                            <div className="panel-heading">
                              {/*{obj.name}*/}
                              {/*</div>*/}
                              {/*<div className="panel-heading"*/}
                              {/*style={{*/}
                              {/*fontWeight: '700',*/}
                              {/*fontSize: '16px',*/}
                              {/*borderBottom: '1px solid #ddd'*/}
                              {/*}}>{obj.name.replace(/_/g, ' ')}&nbsp;<span style={{color:"red"}}>*</span>&nbsp;</div>*/}

                              <div className="panel-body style-7" style={{maxHeight: '250px', overflowX: 'hidden', fontSize: '9px'}}>
                                {(() => {
                                  let finalCheckbox =[];

                                  {obj.items.map(obj2 => {
                                    finalCheckbox.push(
                                      <Checkbox
                                        id={obj2.name + '__' + obj.name}
                                        label={obj2.name}
                                        style={{fontSize:"12px",width:"230px"}}
                                        checked={(() => {
                                          return obj2.selected
                                        })()}
                                        onChange={() => {

                                          let previous_selection=this.props.previous_selection;
                                          let selection=obj.name+"="+obj2.name;
                                          //For enabling un checking
                                          {/*console.log('previous_selection',previous_selection);*/}
                                          {/*console.log('selection',selection);*/}
                                          if(previous_selection==selection)
                                          {
                                            selection='';
                                          }
                                          this.props.onCheckboxChange(selection);
                                          this.props.onGenerateSideFilter();
                                        }}
                                        isDisabled={obj2.disabled}
                                        valid={true}
                                        key={Date.now() + Math.random()}
                                      />
                                    )
                                  })}

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
                <Button style={{marginTop:"5px"}}
                        onClick={() => {

                          this.applyButtonFunctionality();

                        }}>Apply Filters</Button>

                <Button style={{marginTop:"5px"}}
                        onClick={() => {
                          //To un check all the buttons
                          let selection='';
                          this.props.onCheckboxChange(selection);
                          this.props.onGenerateSideFilter();

                          {/*this.resetButtonFunctionality();*/}


                        }}>Clear Filter Selections</Button>

                {/*<Button style={{marginTop:"5px"}}*/}
                {/*onClick={() => {*/}
                {/*//To un check all the buttons*/}
                {/*/!*let selection='';*!/*/}
                {/*/!*this.props.onCheckboxChange(selection);*!/*/}
                {/*/!*this.props.onGenerateSideFilter();*!/*/}

                {/*this.resetButtonFunctionality();*/}

                {/*}}>Load Default view</Button>*/}
              </div>

            </div>
          )
        })()}


      </div>


    );
  }
}

CascadedFilterNpd.propTypes = {

};

export default CascadedFilterNpd;
