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


  updateUrl2 = (category) => {
    console.log('inside updateUrl', category);
    let queryString = '';
    let localUrlParamsString = '';
    [...this.refs.selector.querySelectorAll('input')].map((obj, index) => {
      if (obj.checked == true) {
        console.log(obj);
        let category = obj.id.split('__');

        console.log('queryString', queryString);
        console.log('category--', category);

        if (['store_type', 'commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });
    queryString = queryString.substring(0, queryString.length - 1);
    console.log('11queryString--', queryString);
    // let newvar = queryString.split('&');
    // console.log('11newvar--', newvar);
    this.setState({superQueryString: queryString});
    console.log('this.state.superQueryString', this.state.superQueryString);
    // APPEND URL PARAMS

    this.props.onGenerateUrlParamsString(queryString);
    localStorage.setItem('urlParams', localUrlParamsString);

    // this.props.onGenerateFilterParamsString(queryString);
    // this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
  };
  queryStringForFiltersOutside = "";
  updateUrl = (category1, pre_selected,item,totalFilterData, propsData, currentSelection) => {
    console.log('inside updateUrl', category1);
    console.log('inside totalFilterData Main', totalFilterData);
    console.log('inside propsData', propsData);
    console.log('inside currentSelection', currentSelection);
    let queryString = '';
    let queryStringForFilters = this.queryStringForFiltersOutside;
    console.log('inside this.queryStringForFiltersOutside', this.queryStringForFiltersOutside);
    console.log('inside queryStringForFilters00', queryStringForFilters);
    let localUrlParamsString = '';
    this.queryStringForFiltersOutside = this.queryStringForFiltersOutside + currentSelection + '&';
    console.log('inside 1st queryStringForFilters', this.queryStringForFiltersOutside);
    [...this.refs.selector.querySelectorAll('input')].map((obj, index) => {
      if (obj.checked == true) {
        console.log(obj);
        let category = obj.id.split('__');

        console.log('queryString', queryString);
        console.log('category--', category);

        // if(category.length===1) {
        //   // queryString = queryString + "tesco_week="+`${category[category.length - 1]}&`;
        // }else{
        //   queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        // }
        if (['commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;

        console.log('inside totalFilterData', totalFilterData);
        for(let i=0; i<totalFilterData.length; i++){
          console.log('inside totalFilterData pre_selected', totalFilterData[i].pre_selected);
          console.log('inside totalFilterData title', totalFilterData[i].title);
          console.log('this.category ', category1);
          let totalFilterDataItems = totalFilterData[i].items;

          // if(category1 == ){}else {
            if (!totalFilterData[i].pre_selected) {
              for (let y = 0; y < totalFilterDataItems.length; y++) {
                console.log('inside totalFilterData totalFilterDataItems', totalFilterDataItems);
                console.log('inside totalFilterData totalFilterDataItems[y].title', totalFilterDataItems[y].title);
                console.log('inside totalFilterData totalFilterDataItems[y].resource.selected', totalFilterDataItems[y].resource.selected);
                if (totalFilterDataItems[y].resource.selected) {
                  // queryStringForFilters = queryStringForFilters + currentSelection + '&';
                  console.log('inside 2nd queryStringForFilters', queryStringForFilters);
                  this.queryStringForFiltersOutside = this.queryStringForFiltersOutside + `${totalFilterData[i].title}=${totalFilterDataItems[y].title}&`;
                  console.log('inside final this.queryStringForFiltersOutside', this.queryStringForFiltersOutside);
                }
              }
            } else {
              console.log('inside else',currentSelection);
              console.log('category1 == totalFilterData[i].title',totalFilterData[i].title);
              console.log('category1 == totalFilterData[i]',totalFilterData[i]);
              console.log('category1 == totalFilterData[i]22',category1);
              // if(category1 == totalFilterData[i].title){
                console.log('category1 == totalFilterData[i] 11',category1,totalFilterData[i].title);
                let individualBlock = totalFilterData[i].items
                for (let y = 0; y < totalFilterDataItems.length; y++) {
                  // if (seleted) {
                  //   append
                  // }
                }
              // }

            }
          // }

        }

        console.log('inside final this.queryStringForFiltersOutside', this.queryStringForFiltersOutside);

        if(!pre_selected){
          console.log('pre-selected item',item);
          console.log('category, pre_selected',category, pre_selected);
          queryStringForFilters = queryStringForFilters + `${category[0]}=${category[category.length - 1]}&`;
          console.log('queryStringForFilters inside if',queryStringForFilters);
        }
      }
    });
    queryString = queryString.substring(0, queryString.length - 1);
    console.log('11queryString--', queryString);
    console.log('queryStringForFilters--', queryStringForFilters);
    // let newvar = queryString.split('&');
    // console.log('11newvar--', newvar);
    this.setState({superQueryString: queryString});
    console.log('this.state.superQueryString', this.state.superQueryString);
    // APPEND URL PARAMS

    this.props.onGenerateUrlParamsStringForFilters(this.queryStringForFiltersOutside);
    this.props.onGenerateUrlParamsString(queryString);

    // this.props.onGenerateUrlParamsString(queryString);
    localStorage.setItem('urlParams', localUrlParamsString);

    // this.props.onGenerateFilterParamsString(queryString);
    // this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
  };

  updateUrl1 = (category, itemId) => {
    console.log('inside updateUrl1', category, itemId);
    let queryString = '';
    let localUrlParamsString = '';
    [...this.refs.selector.querySelectorAll('input')].map((obj, index) => {
      if (obj.checked == true) {
        console.log(obj);
        let category = obj.id.split('__');

        console.log('queryString', queryString);
        console.log('category--', category);

        if (['store_type', 'commercial_name', 'category_name', 'buying_controller', 'buyer', 'junior_buyer', 'product_subgroup'].includes(category[0])) {
          // localUrlParamsString = localUrlParamsString + `${category[0]}=${category[category.length - 1]}&`;
        }

        if (itemId == 'junior_buyer') {
          console.log('itemId == junior_buyer', category);
          console.log('itemId == junior_buyer queryString', queryString);
          let newvar = (this.state.superQueryString).split('&');
          console.log('11newvar', newvar);

          let storingValuesofKeys = [];
          let finalApiParams = '';
          for (let i = 0; i < newvar.length; i++) {
            if (newvar[i].includes('product_subgroup') || newvar[i].includes('brand_indicator') || newvar[i].includes('parent_supplier') || newvar[i].includes('supplier')) {
              console.log('11newvar if', newvar);
              storingValuesofKeys.push(newvar[i]);
            }
          }

          for (let i = 0; i < storingValuesofKeys.length; i++) {
            finalApiParams = finalApiParams + storingValuesofKeys[i] + '&';
          }
          console.log('storingValuesofKeys', storingValuesofKeys);


          console.log('finalApiParams', finalApiParams);
          this.setState({superQueryString3: finalApiParams})

          console.log('this.state.superQueryString3', this.state.superQueryString3);


        } else if (itemId == 'product_subgroup') {


          console.log('itemId == junior_buyer', category);
          console.log('itemId == junior_buyer queryString', queryString);
          let newvar = (this.state.superQueryString).split('&');
          console.log('11newvar', newvar);

          let storingValuesofKeys = [];
          let finalApiParams = '';
          for (let i = 0; i < newvar.length; i++) {
            if (newvar[i].includes('brand_indicator') || newvar[i].includes('parent_supplier') || newvar[i].includes('supplier')) {
              console.log('11newvar if', newvar);
              storingValuesofKeys.push(newvar[i]);
            }
          }

          for (let i = 0; i < storingValuesofKeys.length; i++) {
            finalApiParams = finalApiParams + storingValuesofKeys[i] + '&';
          }
          console.log('storingValuesofKeys', storingValuesofKeys);


          console.log('finalApiParams', finalApiParams);

          this.setState({superQueryString3: finalApiParams});


        } else if (itemId == 'brand_indicator') {


          console.log('itemId == junior_buyer', category);
          console.log('itemId == junior_buyer queryString', queryString);
          let newvar = (this.state.superQueryString).split('&');
          console.log('11newvar', newvar);

          let storingValuesofKeys = [];
          let finalApiParams = '';
          for (let i = 0; i < newvar.length; i++) {
            if (newvar[i].includes('parent_supplier') || newvar[i].includes('supplier')) {
              console.log('11newvar if', newvar);
              storingValuesofKeys.push(newvar[i]);
            }
          }

          for (let i = 0; i < storingValuesofKeys.length; i++) {
            finalApiParams = finalApiParams + storingValuesofKeys[i] + '&';
          }
          console.log('storingValuesofKeys', storingValuesofKeys);


          console.log('finalApiParams', finalApiParams);
          this.setState({superQueryString3: finalApiParams});

        } else if (itemId == 'parent_supplier') {


          console.log('itemId == junior_buyer', category);
          console.log('itemId == junior_buyer queryString', queryString);
          let newvar = (this.state.superQueryString).split('&');
          console.log('11newvar', newvar);

          let storingValuesofKeys = [];
          let finalApiParams = '';
          for (let i = 0; i < newvar.length; i++) {
            if (newvar[i].includes('supplier')) {
              console.log('11newvar if', newvar);
              storingValuesofKeys.push(newvar[i]);
            }
          }

          for (let i = 0; i < storingValuesofKeys.length; i++) {
            finalApiParams = finalApiParams + storingValuesofKeys[i] + '&';
          }
          console.log('storingValuesofKeys', storingValuesofKeys);


          console.log('finalApiParams', finalApiParams);
          this.setState({superQueryString3: finalApiParams});

        }


      }
    });
    console.log('queryString3', queryString);
    queryString = queryString.substring(0, queryString.length - 1);

    console.log('queryString2', queryString);
    console.log('category2', category);
    console.log('this.state.superQueryString3', this.state.superQueryString3);
    // APPEND URL PARAMS

    // this.props.onGenerateUrlParamsString(queryString);
    this.props.onGenerateUrlParamsString(this.state.superQueryString3);
    localStorage.setItem('urlParams', localUrlParamsString);

    // this.props.onGenerateFilterParamsString(queryString);
    // this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
  };

  totalFilterData = this.props.sideFilter.checkbox_list;

  componentDidMount = () => {
    console.log('location->>> ');
    // totalFilterData = this.props.sideFilter.checkbox_list;

    // console.log('totalFilterData->>> ',totalFilterData);
    // console.log('this.props.sideFilter.checkbox_list->>> ',this.props.sideFilter.checkbox_list);
    // this.props.onGenerateUrlParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateFilterParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateTable();
  };
  componentDidUpdate = () => {
    // totalFilterData = this.props.sideFilter.checkbox_list;
    // console.log('NewSelector componentDidUpdate', this.props.location);
    //
    // console.log('totalFilterData->>> U',totalFilterData);
    // console.log('this.props.sideFilter.checkbox_list->>> U',this.props.sideFilter.checkbox_list);
    // this.props.onGenerateTable();
  };

  constructor(props) {
    super(props);
    this.state = {
      alertShow: false,
      alertmsg: "Please Select the Mandatory Filters (marked with star).",
      superQueryString: "",
      superQueryString3: "",
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
                      <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                      <span className="accordion-toggle" style={{float: 'right'}}></span>
                    </div>
                  );

                  if (item.title != 'store_type' && item.title != 'brand_indicator'&& item.title != 'parent_supplier' && item.title != 'supplier') {
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
                                                   console.log('item.id', item);
                                                   console.log('obj.title', obj);
                                                   let params = item.id + '=' + obj.title;
                                                   // if (item.pre_selected) {
                                                   // console.log('item.pre_selected true', item.pre_selected);
                                                   //this.updateUrl1(params, item.id, item.pre_selected)
                                                   //} else {
                                                   //console.log('item.pre_selected false', item.pre_selected);
                                                   //this.updateUrl(item.id,item.pre_selected)
                                                   //}
                                                   //this.updateUrl1(item.id)
                                                   this.updateUrl(item.id, item.pre_selected,item,this.totalFilterData,this.props.sideFilter.checkbox_list,params)
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

                  {/*pHierarchyFilterCheck = false;*/}
                  {/*for (let i = 0; i < this.props.sideFilter[0].items.length; i++) {*/}
                    {/*if (this.props.sideFilter[2].items[i].selected == true) {*/}
                      {/*console.log("Cascading filter - filter_data2 for loop", this.props.sideFilter[0].items[i].selected);*/}
                      {/*pHierarchyFilterCheck = true;*/}
                      {/*console.log('pHierarchyFilterCheck11', pHierarchyFilterCheck);*/}
                    {/*} else {*/}
                      {/*pHierarchyFilterCheck = false;*/}
                      {/*console.log('pHierarchyFilterCheck22', pHierarchyFilterCheck);*/}
                    {/*}*/}
                  {/*}*/}
                  this.props.supplierViewKpiSpinnerCheck(0);
                  this.props.barChartSpinnerCheck(0);
                  this.props.onKPIBox();
                  this.props.ontopBottomChart();
                  this.props.defaultGreyScreen(0);

                }}>Apply</Button></div>
              <br/>
              <div className="text-center">
                <Button buttonType={'primary'}
                        onClick={() => {
                          this.props.defaultGreyScreen(1);
                          this.props.onGenerateUrlParamsString('');
                          this.props.onGenerateUrlParamsString2('');
                          this.props.onGenerateUrlParamsString2('');

                        }}>
                  Clear Filters
                </Button>
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

FiltersSupplier.propTypes = {};

export default FiltersSupplier;
