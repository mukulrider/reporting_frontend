/*
 *
 * Promotion actions
 *
 */

import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  KPI_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  SALES_CONSTANT,
  SALES_FETCH_SUCCESS,
  PROMO_GIVEAWAY_CONSTANT,
  PROMO_GIVEAWAY_FETCH_SUCCESS,
  PROMO_PROD_CONSTANT,
  PROMO_PROD_FETCH_SUCCESS,
  PROMO_PART_CONSTANT,
  PROMO_PART_FETCH_SUCCESS,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_FILTER_PARAMS_STRING,
  CHECKBOX_CHANGE, GENERATE_URL_PARAMS_DATA,
  SALES_PARAM,
  GIVEAWAY_PARAM,
  PROMO_PROD_PARAM,
  PROMO_PART_PARAM,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  SEND_URL_PARAMS,
  WEEK,
  CHECKBOX_WEEK_CHANGE,

} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
//For KPI BOXES
export function PromoKpiData()
{
  console.log('actions.js KPI_CONSTANT CONSTANT');
  return {
    type: KPI_CONSTANT,
  };
}

export function PromoKpiDataFetchSuccess(data)
{
  console.log('PromoKpiDataFetchSuccess actions',data)
  return {
    type: KPI_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING SALES DATA

export function PromoSalesData()
{
  console.log('actions.js SALES_CONSTANT CONSTANT');
  return {
    type: SALES_CONSTANT,
  };
}

export function PromoSalesDataFetchSuccess(data)
{
  console.log('PromoSalesDataFetchSuccess(data) actions',data)
  return {
    type: SALES_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING PROMO GIVEAWAY

export function PromoGiveawayData()
{
  console.log('actions.js PromoGiveawayData PROMO_GIVEAWAY_CONSTANT');
  return {
    type: PROMO_GIVEAWAY_CONSTANT,
  };
}

export function PromoGiveawayDataFetchSuccess(data)
{
  console.log('PromoGiveawayDataFetchSuccess(data) PROMO_GIVEAWAY_FETCH_SUCCESS actions',data)
  return {
    type: PROMO_GIVEAWAY_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING PROMO PROD

export function PromoProdData()
{
  console.log('actions.js PromoProdData PROMO_PROD_CONSTANT');
  return {
    type: PROMO_PROD_CONSTANT,
  };
}

export function PromoProdDataFetchSuccess(data)
{
  console.log('PromoProdDataFetchSuccess(data) PROMO_PROD_FETCH_SUCCESS actions',data)
  return {
    type: PROMO_PROD_FETCH_SUCCESS,
    data,
  };
}


// FOR FETCHING PROMO PART

export function PromoPartData()
{
  console.log('actions.js PromoPartData PROMO_PART_CONSTANT');
  return {
    type: PROMO_PART_CONSTANT,
  };
}

export function PromoPartDataFetchSuccess(data)
{
  console.log('PromoPartDataFetchSuccess(data) PROMO_PART_FETCH_SUCCESS actions',data)
  return {
    type: PROMO_PART_FETCH_SUCCESS,
    data,
  };
}


//FOR SAVING WEEK PARAM (triggered by Week Buttons)

export function SaveWeekParam(data)
{
  console.log('SaveWeekParam = actions', data);
  return {
    type: WEEK_PARAM,
    data,
  };
}

// For saving the KPI param (triggered by KPI buttons)

export function SaveKPIParam(data) {
  console.log('SaveKPIParam = actions', data);
  return {
    type: KPI_PARAM,
    data,
  };
}


export function SaveSalesParam(data) {
  console.log('SaveSalesParam = actions', data);
  return {
    type: SALES_PARAM,
    data,
  };
}

export function SaveGiveawayParam(data) {
  console.log('SaveGiveawayParam = actions', data);
  return {
    type: GIVEAWAY_PARAM,
    data,
  };
}

export function SavePromoProdParam(data) {
  console.log('SavePromoProdParam = actions', data);
  return {
    type: PROMO_PROD_PARAM,
    data,
  };
}

export function SavePromoPartParam(data) {
  console.log('SavePromoPartParam = actions', data);
  return {
    type: PROMO_PART_PARAM,
    data,
  };
}
//--------------------- FILTER DATA -------------------------------


export function getFilter()
{
  console.log('actions.js Get Filter',FILTER_CONSTANT);
  return {
    type: FILTER_CONSTANT,
  };
}


export function FilterFetchSuccess(data)
{
  console.log('PromoFilterFetchSuccess = actions', data);
  return {
    type: FILTER_FETCH_SUCCESS,
    data,
  };
}


//FOR FILTERS

export function generateUrlParams(data) {
  // //console.log(data);
  return {
    type: GENERATE_URL_PARAMS,
    data
  }
}

//--------------------- Storing the param in reducer -------------------------------

export function sendUrlParams(data) {
  // console.log('1.Send url param - action',data);

  return {
    type: SEND_URL_PARAMS ,
    data
  };
}



export function generateUrlParamsString(data)
{
  console.log('PromoFilterFetchSuccess = actions', data);
  return {
    type: GENERATE_FILTER_PARAMS_STRING,
    data,
  };
}
//Week Filter


export function getWeekFilter()
{
  console.log('actions.js getWeekFilter',WEEK_FILTER_CONSTANT);
  return {
    type: WEEK_FILTER_CONSTANT,
  };
}

export function WeekFilterFetchSuccess(data)
{
  console.log('WeekFilterFetchSuccess = actions', data);
  return {
    type: WEEK_FILTER_FETCH_SUCCESS,
    data,
  };
}
export function WeekFilterParam(data)
{
  console.log('WeekFilterParam = actions', data);
  return {
    type: WEEK_FILTER_PARAM,
    data,
  };
}


export function SaveWeek(data) {
  console.log('SaveWeek = actions',+ data);
  return {
    type: WEEK,
    data,
  };
}


export function checkboxChange(data) {
  // console.log("Selection in reducer" + data);
  return {

    type: CHECKBOX_CHANGE,
    data
  };
}

export function checkboxWeekChange(data) {
  console.log("checkboxWeekChange Selection in actions" + data);
  return {
    type: CHECKBOX_WEEK_CHANGE,
    data
  };
}

