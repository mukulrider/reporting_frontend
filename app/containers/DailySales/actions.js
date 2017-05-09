/*
 *
 * DailySales actions
 *
 */

import {
  DEFAULT_ACTION,
  LINECHART_CONSTANT,LINECHART_FETCH_SUCCESS,
  KPI_PARAM,
  KPI_CONSTANT,
  WEEK_PARAM,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_FILTER_PARAMS_STRING,
  CHECKBOX_CHANGE, GENERATE_URL_PARAMS_DATA,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  SEND_URL_PARAMS,
  WEEK,
  CHECKBOX_WEEK_CHANGE

} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function lineChartCallAction()
{
  console.log('Reached Action Call');
  return {
    type: LINECHART_CONSTANT,
  };
}

export function LineChartDataFetchSuccess(data)
{
  console.log('LINECHART_FETCH_SUCCESS with data',data)
  return {
    type: LINECHART_FETCH_SUCCESS,
    data,
  };
}

export function SaveKPIParam(data) {
  console.log('SaveKPIParam = actions', data);
  return {
    type: KPI_PARAM,
    data,
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


//FOR SAVING WEEK PARAM (triggered by Week Buttons)

export function SaveWeekParam(data)
{
  console.log('SaveWeekParam = actions', data);
  return {
    type: WEEK_PARAM,
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
  console.log('PromoFilterFetchSuccess = actions');//, data);
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
  console.log('SaveWeek = actions', data);
  return {
    type: WEEK,
    data,
  };
}


export function checkboxChange(data) {
  // console.log("Selection in reducer" + data);
  // alert(data)
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
