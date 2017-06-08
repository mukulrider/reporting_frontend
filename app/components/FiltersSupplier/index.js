/**
 *
 * FiltersSupplier
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

class FiltersSupplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  updateUrl = (category) => {
    let queryString = '';
    let localUrlParamsString = '';
    [...this.refs.selector.querySelectorAll('input')].map((obj, index) => {
      if (obj.checked == true) {
        console.log(obj);
        let category = obj.id.split('__');


        // if (category[0] === 'buying_controller') {
        //   this.props.onGenerateBuyingController(category[category.length - 1])
        // }
        // if (category[1] === 'category_director') {
        //   // this.props.onGenerateBuyingController(category[category.length - 1])
        //   this.props.onGenerateCategoryDirector(category[category.length - 2])
        // }
        console.log('queryString', queryString);
        console.log('category--', category);

        if (['store_type', 'commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });
    queryString = queryString.substring(0, queryString.length - 1);

    console.log('queryString2', queryString);
    // APPEND URL PARAMS

    this.props.onGenerateUrlParamsString(queryString);
    localStorage.setItem('urlParams', localUrlParamsString);
    this.props.onGenerateSideFilter();

  };

  componentDidMount = () => {
    console.log('location->>> ');
    // this.props.onGenerateUrlParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateFilterParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateTable();
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

  clearFilter = () => {
    // this.props.onGenerateFilterParamsString('');
    // this.props.onGenerateUrlParamsString('');
    // this.props.onGenerateUrlParamsData();
  };

  render() {

    let pHierarchyFilterCheck = true;
    let weekFilterCheck = true;
    console.log("Cascading filters", this.props.sideFilter.checkbox_list[2]);
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
                  var panelHeader = (
                    <div className="text-capitalize">
                      {item.title.replace(/_/g, ' ')}&nbsp;{item.required ?
                      <span style={{color: 'red'}}></span> : '' } &nbsp;
                      <span className="accordion-toggle" style={{float: 'right'}}></span>
                    </div>
                  );

                  if (item.title != 'store_type' && item.title != 'parent_supplier' && item.title != 'supplier') {
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
                  }
                })}
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

              <div className="text-center">
                <Button onClick={() => {

                  this.props.supplierViewKpiSpinnerCheck(0);
                  this.props.barChartSpinnerCheck(0);
                  this.props.onKPIBox();
                  this.props.ontopBottomChart();
                  this.props.defaultGreyScreen(0);
                }}>Apply</Button></div>
              <br/>
              <div className="text-center">
                <Button onClick={() => {


                  const getCookie = (name) => {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) {
                      return parts.pop().split(';').shift();
                    }
                  };
                  //fetching values from cookie
                  const userId = getCookie('token');
                  const userName = getCookie('user');
                  const designation = getCookie('designation');
                  const buyingController = getCookie('buying_controller');
                  const buyer = getCookie('buyer');
                  if (buyer && buyingController) {
                    this.props.onGenerateUrlParamsString(`buying_controller=${buyingController}&buyer=${buyer}`);
                    this.props.onGenerateSideFilter();

                  } else if (buyingController) {
                    this.props.onGenerateUrlParamsString(`buying_controller=${buyingController}`);
                    this.props.onGenerateSideFilter();

                  }
                          {/*this.props.onGenerateUrlParamsString('');*/}
                          this.props.onGenerateUrlParamsString2('');
                          this.props.defaultGreyScreen(1);
                          this.props.onGenerateSideFilter();

                        }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )
        })()}
      </div>

    );
  }
}

FiltersSupplier.propTypes = {};

export default FiltersSupplier;
