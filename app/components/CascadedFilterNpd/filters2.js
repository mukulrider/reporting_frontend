/**
 *
 * CascadedFilterNpdImpact
 *
 */

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
// import Panel from 'components/panel';
import {browserHistory} from 'react-router';
import InputField from 'components/input_field';
import {Accordion, PanelGroup, Panel} from 'react-bootstrap';
import styles from './style.scss';
import {Modal} from 'react-bootstrap';


class CascadedFilterNpdImpact extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    // console.log("----inside selector----",this.props);
    this.props.onGenerateSideFilter();

  };

  componentDidUpdate = () => {

  };

  constructor(props) {
    super(props);
    this.state = {
      alertShow: false,
      alertmsg: "Please select all the mandatory filters for the calculation of NPD impact."
    };

  }

//-------------------------------- APPLY --------------------------------------------
  // Function which gets all the selections and pushes it into urls
  // 1.Fetches all the checked entries
  // 2.Fetches all the manual inputs
  // 3.checks whether all are valid and all filters have been selected
  // 4.Updates the url-(browser history.push)
  // 5. This in turn triggers component did mount

  applyButtonFunctionality = () => {

    let newUrl = this.props.location.pathname;
    let x = '';
    let breadcrumb = '';
    let psg = '';
    let brandName = '';
    let tillRoll = '';
    let packageType = '';
    let measureType = '';

    let numberOfFiltersSelected = 0;
    // For all selections in the checkboxes
    [...this.refs.npdImpactFilters.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {

        let split = obj.id.split('__');
        x = x + split[1] + "=" + split[0] + "&";
        let underscoreReplaced = split[1].replace(/_/g, ' ');
        let formattedFilter = underscoreReplaced.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        if (formattedFilter === "Product Sub Group Description") {
          // breadcrumb = breadcrumb + split[0] + " > ";
          psg = split[0];
          // breadcrumb = breadcrumb + formattedFilter + "= " + split[0] + " > ";
        } else if (formattedFilter === "Brand Name") {
          brandName = split[0];
        } else if (formattedFilter === "Till Roll Description") {
          tillRoll = split[0];
        } else if (formattedFilter === "Package Type") {
          packageType = split[0];
        } else if (formattedFilter === "Measure Type") {
          measureType = split[0];
        }

        numberOfFiltersSelected = numberOfFiltersSelected + 1;
      }
    });

    const queryString = x.substring(0, x.length - 1);
    this.props.onGenerateUrlParamsString(queryString);

    //For the manual inputs
    let acp = this.props.ACP_field_entry;
    let asp = this.props.ASP_field_entry;
    let size = this.props.Size_field_entry;

    let validFilters = 1;
    // ---------------------FINAL VALIDATIONS BEFORE APPLYING---------------------

    // FOR FILTERS - all filters are mandatory , so checking wthr all are selected or not
    if (numberOfFiltersSelected != 11) {
      // alert("All filters are mandatory");
      this.setState({alertShow: true})
      this.setState({alertmsg: "Please select all the mandatory filters for the calculation of NPD impact."})
      validFilters = 0;
    } else if (size === '') {
      this.setState({alertShow: true})
      this.setState({alertmsg: "Please enter values for Size"})
      validFilters = 0;
    } else if (asp === '') {
      this.setState({alertShow: true})
      this.setState({alertmsg: "Please enter values for ASP"})
      validFilters = 0;
    } else if (acp === '') {
      this.setState({alertShow: true})
      this.setState({alertmsg: "Please enter values for ACP"})
      validFilters = 0;
    }

    // Validation fof the manual entry should come here ----->

    // if (acp > acp_max || acp < acp_min) {
    //   alert("ACP entries out of bound . ACP should be between " + acp_max + " and " + acp_min);
    //   validFilters = 0;
    // }
    //
    // if (asp > asp_max || asp < asp_min) {
    //   alert("ASP entries out of bound . ASP should be between " + asp_max + " and " + asp_min);
    //   validFilters = 0;
    // }
    //
    // if (size > size_max || size < size_min) {
    //   alert("Size entry is out of bound . Size should be between " + size_max + " and " + size_min);
    //   validFilters = 0;
    // }
    //

    // If all the filters are selected and the manual entries are valid
    if (validFilters == 1) {
      let sep = "    |    "
      let completeSelections = queryString + "&asp=" + asp + "&acp=" + acp + "&size=" + size;
      // let completeBreadcrumb  = breadcrumb + " ASP =" + asp + " > ACP = " + acp + " > Size = " + size;
      let completeBreadcrumb = psg + "   >   " + brandName + sep + tillRoll + sep + packageType + sep + size + measureType;
      // let urlParams = '';

      console.log("just_before_ajax");

      this.props.onUpdateBreadCrumbs(completeBreadcrumb);
      this.props.onPageLoadSelectFilterIndicator(false);
      this.props.onSendUrlParams(completeSelections);
      this.props.onDataFetchCanniProdTable();
      this.props.onDataFetchOnPageLoad();
      this.props.onDataFetchOnBubbleData();
    }
  };

//------------------------------- APPLY ENDS ---------------------------------------------


  //------------------------------- UPDATING PREVIOUS SELECTIONS--------------------------
  // 1.Gets all the checked values from the ref 'npdImpactFilters'
  // 2.combines it into a string separated by '&'
  // 3. updates the state variable 'filterSelectionsTillNow' by calling onSaveFilterSelectionsTillNow()
  // 4. this state variable 'filterSelectionsTillNow' should be appended during the ajax for the call along with
  //     the recent filter selection which is stored in 'filter_selection' in the SAGAS


  saveHierarchySelections = () => {

    let newUrl = this.props.location.pathname;
    let x = '';

    [...this.refs.npdImpactFilters.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        let split = obj.id.split('__');
        x = x + split[1] + "=" + split[0] + "&";
      }
    });

    const queryString = x.substring(0, x.length - 1);
    console.log("-----after every selection------", queryString);
    this.props.onSaveFilterSelectionsTillNow(queryString);
  };

  //------------------------------- UPDATING ENDS ---------------------------------------------

  //------------------------------- RESET BUTTON FUNCTIONALITY SHOULD COME HERE


  render() {
    return (
      <div id="style-7" style={{
        height: '80%',
        width: '20%',
        position: 'fixed',
        overflow: 'scroll',
        paddingRight: '5px',
        overflowX: 'hidden',
        borderTop: '1px solid #ccc',
      }}>

        {/*Filter*/}
        <div className="row" ref={'npdImpactFilters'}>
          <div className="col-xs-12">

            {/*productHierarchyFilterBlock*/}
            {/*Upper half of hierarchy -- Product hierarchy part*/}
            <div className="row" ref={'productHierarchyFilterBlock'}>
              <div className="col-xs-12">
                <PanelGroup defaultActiveKey="1" accordion>
                  {(() => {
                    if (this.props.sideFilter) {
                      return (

                        this.props.sideFilter.product_hierarchy.map((obj, key) => {
                          {/*console.log("checking",obj);*/
                          }
                          var panelHeader = (
                            <div className="text-capitalize">{obj.name.replace(/_/g, ' ')} <span style={{color: "red"}}>*</span>&nbsp;
                              <span className="accordion-toggle" style={{float: 'right'}}></span></div>
                          );
                          return (
                            <Panel header={panelHeader} eventKey={++key}>
                              {/*<div className="panel text-capitalize" key={Date.now() + Math.random()}>*/}
                              <div className="panel selector">

                                <div className="panel-body style-7"
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
                                                      console.log(" When any of the filters are checked ");
                                                      this.saveHierarchySelections();

                                                      let previous_selection = this.props.previous_selection;
                                                      let selection = obj.name + "=" + obj2.name;

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

              </div>
            </div>

            {/*productInfoFilterBlock*/}
            {/*Lower half of hierarchy -- Product information part*/}
            <div className="row" ref={'productInfoFilterBlock'}>
              <div className="col-xs-12">
                <PanelGroup defaultActiveKey="11" accordion>
                  {(() => {
                    if (this.props.sideFilter) {
                      if (this.props.sideFilter.product_information) {

                        console.log("Inside the info loop");
                        {/*this.saveHierarchySelections();*/
                        }
                        return (

                          this.props.sideFilter.product_information.map((obj, key1) => {

                            var panelHeader = (
                              <div className="text-capitalize"
                                   style={{
                                     fontWeight: '700',
                                     fontSize: '16px',
                                     // borderBottom: '1px solid #ddd'
                                   }}>{obj.name.replace(/_/g, ' ')} <span style={{color: "red"}}>*</span>&nbsp;
                                <span className="accordion-toggle" style={{float: 'right'}}></span></div>
                            );

                            return (
                              <Panel header={panelHeader} eventKey={++key1}>
                                <div className="panel text-capitalize"
                                     key={Date.now() + Math.random() + Math.random() + 10}>

                                  {/*title*/}

                                  {/*Filter checkbox*/}
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
                                                        console.log(" When any of the any info filters are checked ");
                                                        this.saveHierarchySelections();

                                                        let previous_selection = this.props.previous_selection;
                                                        let selection = obj.name + "=" + obj2.name;

                                                        console.log("whats in selection", selection);

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
                    }
                  })()}
                </PanelGroup>
              </div>
            </div>


            {/*ASP,ACP and Size*/}

            {(() => {
              if (this.props.sideFilter) {
                if (this.props.sideFilter.product_information) {
                  return (
                    <div style={{marginLeft:'12px'}}>
                      {/*Size*/}
                      <div className="row">
                        <div className="col-xs-2">
                          <div style={{color: '#00539f', fontWeight: '700', marginTop: "10px", fontSize: '16px'}}>Size
                          </div>
                        </div>
                        <div className="col-xs-10">
                          <div style={{marginBottom: "15px", width: "200px"}}>

                            <InputField type={"number"}
                                        placeholder="Enter Size"
                                        value={this.props.Size_field_entry}
                                        onChange={(e) => {
                                          this.props.onSaveSizeFilterData(e);
                                          {/*this.props.onDataFetchOnPageLoad();*/
                                          }
                                        }}
                            />

                          </div>

                        </div>
                      </div>

                      {/*ASP*/}
                      <div className="row">
                        <div className="col-xs-2">
                          <div style={{color: '#00539f', fontWeight: '700', marginTop: "10px", fontSize: '16px'}}>ASP
                          </div>
                        </div>
                        <div className="col-xs-10">
                          <div style={{marginBottom: "15px", width: "200px"}}>
                            <InputField type={"number" }
                                        placeholder="Enter ASP"
                                        value={this.props.ASP_field_entry}
                                        onChange={(e) => {
                                          this.props.onSaveAspFilterData(e);
                                          {/*this.props.onDataFetchOnPageLoad();*/
                                          }
                                        }}
                            />

                          </div>
                        </div>
                      </div>

                      {/*ACP*/}
                      <div className="row">
                        <div className="col-xs-2">
                          <div style={{color: '#00539f', fontWeight: '700', marginTop: "10px", fontSize: '16px'}}>ACP
                          </div>
                        </div>
                        <div className="col-xs-10">
                          <div style={{marginBottom: "15px", width: "200px"}}>

                            <InputField type={"number"}
                                        placeholder="Enter ACP"
                                        value={this.props.ACP_field_entry}
                                        onChange={(e) => {
                                          this.props.onSaveAcpFilterData(e);
                                          {/*this.props.onDataFetchOnPageLoad();*/
                                          }
                                        }}
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                  )
                }
              }
            })()}


          </div>
        </div>

        {/*Alert modal*/}
        <Modal show={this.state.alertShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
          <Modal.Body>

            <div className="row">
              <div className="col-xs-12 alertMadatoryFilter">
                {this.state.alertmsg}
              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({alertShow: false})
              }}
              style={{display: 'block', margin: '0 auto'}}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/*Buttons*/}
        <div style={{textAlign: "center"}}>
          <Button style={{marginTop: "5px"}}
                  onClick={() => {

                    this.applyButtonFunctionality();


                  }}>Apply Filters</Button></div>

        <div style={{textAlign: "center"}}>
          <Button style={{marginTop: "5px"}}
                  onClick={() => {
                    //To un check all the buttons
                    let selection = '';
                    this.props.onCheckboxChange(selection);
                    this.props.onGenerateSideFilter();

                    {/*this.resetButtonFunctionality();*/
                    }

                  }}>Reset</Button></div>
      </div>


    );
  }
}

CascadedFilterNpdImpact.propTypes = {};

export default CascadedFilterNpdImpact;
