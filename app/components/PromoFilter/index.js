/**
 *
 * PromoFilter
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

class PromoFilter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  updateUrl = (category) => {
    let queryString = '';
    let localUrlParamsString = '';
    [...this.refs.selector.querySelectorAll('input')].map((obj, index) => {
      if (obj.checked == true) {
        console.log("Objects", obj);
        let category = obj.id.split('__');


        // if (category[0] === 'buying_controller') {
        //   this.props.onGenerateBuyingController(category[category.length - 1])
        // }
        // if (category[1] === 'category_director') {
        //   // this.props.onGenerateBuyingController(category[category.length - 1])
        //   this.props.onGenerateCategoryDirector(category[category.length - 2])
        // }
        if (['store_type', 'commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });
    queryString = queryString.substring(0, queryString.length - 1);
    // alert(queryString);
    // APPEND URL PARAMS
    // this.props.onGenerateUrlParamsString(queryString);
    // this.props.onGenerateUrlParamsData();
    this.props.onGenerateUrlParamsString(queryString);
    localStorage.setItem('urlParams', localUrlParamsString);

    this.props.generateSideFilter();
    // this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
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
    console.log('this.props', this.props);
    return (
      <div ref={'selector'}>
        {(() => {
          return (
            <div id="style-7">
              <PanelGroup defaultActiveKey="1" accordion>
                {this.props.sideFilter.checkbox_list.map((item, key) => {
                  let panelHeader = (
                    <div className="text-capitalize">
                      {item.title.replace(/_/g, ' ')}&nbsp;{item.required ?
                      <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                      <span className="accordion-toggle" style={{float: 'right'}}></span>
                    </div>
                  );
                  if (!['store_type', 'brand_name', 'product'].includes(item.title)) {

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

                  let filterDataWeek = this.props.weekurlParam;
                  let filterData = this.props.urlParamsString;

                  if (!(typeof(filterDataWeek) == "undefined") && !(typeof(filterData) == "undefined")) {
                    console.log('tesco_weeek   filterDataWeek undefined ', filterDataWeek);
                    if (filterDataWeek.includes("tesco_week") && filterData.includes("buying_controller=")) {
                      console.log('tesco_weeek filterDataWeek', filterDataWeek);
                      console.log('--filterData', filterData);
                      this.props.pieChartSuccess(0);
                      this.props.kpiDataSuccess(0);
                      {/*this.props.promoGiveAwaySuccess(0);*/
                      }
                      this.props.trendChartSpinner(0);
                      this.props.productsCountSplitSuccess(0);
                      {/*this.props.promoParticipationBySplitSuccess(0);*/
                      }
                      this.props.productsTableSplitSuccess(0);
                      this.props.productsOnPromoTableFetch();
                      this.props.trendChartDataFetch();

                      this.props.loadKpi();
                      this.props.loadSales();
                      this.props.loadPromoGiveaway();
                      this.props.loadPromoProd();
                      this.props.loadPromoPart();

                    }
                    else {
                      console.log('modal open');
                      this.setState({alertShow: true});
                    }
                  } else {
                    console.log('modal open');
                    this.setState({alertShow: true});
                  }

                }}>Apply</Button>
                <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
                <Button buttonType={'secondary'} onClick={() => {
                  let selection = '';
                  this.props.onSaveWeekFilterParam(selection);
                  this.props.ongenerateWeekFilter();
                  let queryString = '';
                  this.props.onGenerateUrlParamsString(queryString);
                  this.props.generateSideFilter();

                }}>Clear filters</Button>
                <div style={{height: '1%', width: '100%'}}>&nbsp;</div>
                {/*<Button onClick={() => {*/}
                {/*let  selection = '';*/}
                {/*this.props.onSaveWeekFilterParam(selection);*/}
                {/*this.props.ongenerateWeekFilter();*/}
                {/*let queryString='';*/}
                {/*this.props.onGenerateUrlParamsString(queryString);*/}
                {/*this.props.generateSideFilter();*/}
                {/*this.props.loadKpi();*/}
                {/*this.props.loadSales();*/}
                {/*this.props.loadPromoGiveaway();*/}
                {/*this.props.loadPromoProd();*/}
                {/*this.props.loadPromoPart();*/}
                {/*}}>Load default</Button>*/}
              </div>
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

PromoFilter.propTypes = {};

export default PromoFilter;
