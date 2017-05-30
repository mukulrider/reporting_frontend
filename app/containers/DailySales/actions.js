/*
 *
 * DailySales actions
 *
 */

import {
  DEFAULT_ACTION,
  CARDS_CONSTANT,CARDS_DATA_FETCH_SUCCESS,
  CHARTS_CONSTANT,CHARTS_DATA_FETCH_SUCCESS,
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
  DS_VIEW_KPI_SPINNER,
  LINE_CHART_SPINNER,
  WEEK,
  CHECKBOX_WEEK_CHANGE,
  STORE_FILTER_PARAM,
  DEFAULT_PAGE_LOAD_CHECK,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function cardsCallAction()
{
  console.log('Reached Cards Action Call');
  return {
    type: CARDS_CONSTANT,
  };
}

export function chartCallAction()
{
  console.log('Reached Action Call');
  return {
    type: CHARTS_CONSTANT,
  };
}
export function cardDataFetchSuccess(data)
{
  console.log('CARDS_DATA_FETCH_SUCCESS',data)
  return {
    type: CARDS_DATA_FETCH_SUCCESS,
    data,
  };
}
export function chartDataFetchSuccess(data)
{
  console.log('CHARTS_DATA_FETCH_SUCCESS',data)
  return {
    type: CHARTS_DATA_FETCH_SUCCESS,
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

//DEFAULT PAGE LOAD CHECK FOR TESCO WEEEK

export function defaultPageLoadCheck(data)
{
  console.log('defaultPageLoadCheck', data);
  return {
    type: DEFAULT_PAGE_LOAD_CHECK,
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
  console.log('PromoFilterFetchSuccess = actions');   //, data);
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

export function StoreFilterParam(data) {
  console.log('StoreFilterParam = actions', data);
  return {
    type: STORE_FILTER_PARAM,
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
  console.log("checkboxWeekChange Selection in actions");
  return {
    type: CHECKBOX_WEEK_CHANGE,
    data
  };
}

//SPINNER FOR DS VIEW KPI

export function DSViewKpiSpinnerCheckSuccess(DSViewKpiSpinnerCheck) {
  console.log('DSViewKpiSpinnerCheck', DSViewKpiSpinnerCheck);
  return {
    type: DS_VIEW_KPI_SPINNER,
    DSViewKpiSpinnerCheck
  }
}

//SPINNER FOR LINE CHART

export function LineChartSpinnerCheckSuccess(LineChartSpinnerCheck) {
  console.log('LineChartSpinnerCheckSuccess', LineChartSpinnerCheck);
  return {
    type: LINE_CHART_SPINNER,
    LineChartSpinnerCheck
  }
}
