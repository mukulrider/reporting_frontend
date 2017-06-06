/**
 *
 * NewSelector2
 *
 */

import React from 'react';
import {browserHistory} from 'react-router';
import Checkbox from 'components/checkbox';
import RadioButton from 'components/radio_button';
// import Panel from 'components/panel';
import {Accordion, PanelGroup, Panel} from 'react-bootstrap';
import Button from 'components/button';
import {Modal} from 'react-bootstrap';
// import styled from 'styled-components';
import styles from './style.scss';

class FiltersProduct extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  updateUrl = (category) => {
    let queryString = '';
    let localUrlParamsString = '';

    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        console.log("Filter Obj:", obj);
        let category = obj.id.split('__');


        // if (category[0] === 'buying_controller') {
        //   this.props.onGenerateBuyingController(category[category.length - 1])
        // }
        // if (category[1] === 'category_director') {
        //   // this.props.onGenerateBuyingController(category[category.length - 1])
        //   this.props.onGenerateCategoryDirector(category[category.length - 2])
        // }
        console.log('queryString', queryString);
        if (['commercial_name','category_name','buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])){
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });
    queryString = queryString.substring(0, queryString.length - 1);
    // alert(queryString);
    // APPEND URL PARAMS

    this.props.onGenerateUrlParamsString(queryString);
    localStorage.setItem('urlParams', localUrlParamsString);

    console.log('this.props.onGenerateUrlParamsString(queryString)', this.props.onGenerateUrlParamsString(queryString));
    // this.props.onGenerateFilterParamsString(queryString);
    // this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
  };

  componentDidUpdate = () => {
    console.log('NewSelector componentDidUpdate', this.props.location);
    // this.props.onGenerateTable();
  };

  constructor(props) {
    super(props);
    this.state = {
      alertShow: false,
      alertmsg: "Please Select the Mandatory Filters (marked with star)."
    };

  }


  render() {
    return (

      <div ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">

              <PanelGroup defaultActiveKey="1" accordion>
                {this.props.sideFilter.checkbox_list.map((item, key) => {
                  var panelHeader = (
                    <div className="text-capitalize">
                      {item.title.replace(/_/g, ' ')}&nbsp;{item.required ?
                      <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                      <span className="accordion-toggle" style={{float: 'right'}}></span>
                    </div>
                  );
                  return (

                    <Panel header={panelHeader} eventKey={++key} key={Date.now() + Math.random()}>
                      <div className="panel text-capitalize">

                        <div className="panel-body style-7"
                             style={{maxHeight: '250px', overflowX: 'hidden', fontSize: '9px'}}>
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
                              return <Checkbox style="font-size:12px;"
                                               id={item.id + '__' + item.category_director + '__' + obj.title}
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
                              return <Checkbox style="font-size:12px,width:230px;"
                                               id={item.id + '__' + item.category_director + '__' + obj.title}
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


              <Modal show={this.state.alertShow} bsSize="sm" aria-labelledby="contained-modal-title-sm" style={{marginTop: '10%'}}>
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-sm"
                               style={{textAlign: 'center', fontSize: '18px'}}><span
                    style={{textAlign: 'center', fontSize: '14px'}}><b>Mandatory Filter Selection Missing</b></span><span
                    style={{textAlign: 'right', float: 'right', marginTop: '1.1%'}}
                    onClick={() => this.setState({alertShow: false})} className="glyphicon glyphicon-remove-sign"></span>
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



              <div className="text-center">
                <Button onClick={() => {
                  this.props.defaultGreyScreen(0);
                  this.props.tabsAndApplySpinner(0);
                  this.props.onProductPage();

                  // let filterDataWeek = this.props.filter_week_selection;
                  // let filterData = this.props.urlParamsString;
                  // let hierarchyData = this.props.userParams;
                  // console.log('filterDataWeek', filterDataWeek);

                  // if (1 == 1) {
                  //   console.log('tesco_weeek   filterDataWeek undefined ', filterDataWeek, filterData);
                  //   if (1 == 1) {
                  //     console.log('tesco_weeek filterDataWeek', filterDataWeek);
                  //     console.log('--filterData', filterData);
                  //
                  //
                  //
                  //   }
                  //   else {
                  //     console.log('modal open');
                  //     this.setState({alertShow: true});
                  //   }
                  // } else {
                  //   console.log('modal open');
                  //   this.setState({alertShow: true});
                  // }
                }}>Apply Filters</Button>
                <Button style={{marginTop:"4px", marginLeft:"0 auto"}} buttonType={'primary'}

                        onClick={() => {
                          this.props.defaultGreyScreen(1);
                          this.props.onGenerateUrlParamsString('');
                          // let previous_week_selection = this.props.previous_week_selection;
                          // let selection = this.props.filter_week_selection;
                          //For enabling un checking
                          console.log('Cascaded Filter previous_week_selection', previous_week_selection);
                          console.log('Cascaded Filter selection', selection);

                          this.props.onGetFilter('');
                        }}>Clear Filters</Button></div>

            </div>
          )
        })()}
      </div>

    );
  }
}

FiltersProduct.propTypes = {};

export default FiltersProduct;
