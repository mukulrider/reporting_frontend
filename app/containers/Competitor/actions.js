/*
 *
 * Competitor actions
 *
 */

import {
  DEFAULT_ACTION,
  WATERFALL_CONSTANT,
  WATERFALL_DATA_FETCH_SUCCESS,
  PIECHART_CONSTANT,
  PIECHART_DATA_FETCH_SUCCESS,
  PRICE_RANGE_CONSTANT,PRICE_RANGE_DATA_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  WEEK,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  CHECKBOX_CHANGE,
  CHECKBOX_WEEK_CHANGE,
  SEND_URL_PARAMS,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  SAVE_PRICE_INDEX,
  OUTPERFORMANCE_CONSTANT,
  PRICE_OUTPERFORMACE_FETCH_SUCCESS,
  PRICE_INDEX_CLICK,
  PIE_CHART_SPINNER_SUCCESS,
  OUTPERFORMANCE_CHART_SPINNER_SUCCESS,
  WATERFALL_CHART_ASDA_SPINNER_SUCCESS,
  PRICE_RANGE_CHART_SPINNER_SUCCESS,

} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function CompetitorWaterfall() {
  console.log("action.js WATERFALLCONSTANT");
  return {
    type: WATERFALL_CONSTANT,
  };
}

export function CompetitorWaterfallDataFetchSuccess(data) {
  console.log('CompetitorWaterfallDataFetchSuccess - actions', data);
  return {
    type: WATERFALL_DATA_FETCH_SUCCESS,
    data,
  };
}

export function CompetitorPieChart()
{
  console.log('actions.js PIECHARTCONSTANT');
  return {
    type: PIECHART_CONSTANT,
  };
}

export function CompetitorPieChartDataFetchSuccess(data)
{
  console.log('CompetitorPieChartDataFetchSuccess = actions', data);
  return {
    type: PIECHART_DATA_FETCH_SUCCESS,
    data,
  };
}

export function CompetitorPriceRange()
{
  console.log('actions.js PRICERANGE CONSTANT');
  return {
    type: PRICE_RANGE_CONSTANT,
  };
}

export function CompetitorPriceRangeDataFetchSuccess(data)
{
  console.log('CompetitorPriceRangeDataFetchSuccess = actions', data);
  return {
    type: PRICE_RANGE_DATA_FETCH_SUCCESS,
    data,
  };
}

export function CompetitorOutperformance()
{
  console.log('actions.js OUTPERFORMANCE CONSTANT');
  return {
    type: OUTPERFORMANCE_CONSTANT,
  };
}

export function CompetitorOutpermanceFetchSuccess(data)
{
  console.log('CompetitorOutpermanceFetchSuccess = actions',data)
  return {
    type: PRICE_OUTPERFORMACE_FETCH_SUCCESS,
    data,
  };
}

// For saving the price index (triggered by the price index buttons)


export function SavePriceParam(data)
{
  console.log('SavePriceParam = actions', data);
  return {
    type: SAVE_PRICE_INDEX,
    data,
  };
}

export function SavePriceIndexParam(data) {
  console.log('SavePriceIndexParam action', data)
  return {
    type: PRICE_INDEX_CLICK,
    data
  }
}



// For saving the week param (triggered by time period buttons)

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


export function SaveWeek(data) {
  console.log('SaveWeek = actions',+ data);
  return {
    type: WEEK,
    data,
  };
}
//--------------------- FILTER DATA -------------------------------


export function getFilter()
{
  console.log('actions.js Get Filter');
  return {
    type: FILTER_CONSTANT,
  };
}



export function FilterFetchSuccess(data)
{
  console.log('CompetitorFilterFetchSuccess = actions', data);
  return {
    type: FILTER_FETCH_SUCCESS,
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


//--------------------- Storing the param in reducer -------------------------------

export function sendUrlParams(data) {
  // console.log('1.Send url param - action',data);

  return {
    type: SEND_URL_PARAMS ,
    data
  };
}


export function generateUrlParams(data) {
  // //console.log(data);
  return {
    type: GENERATE_URL_PARAMS,
    data
  }
}

export function generateUrlParamsString(data) {
  // //console.log(data);
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  }
}

//PIE CHART SPINNER
export function onPieChartSpinnerSuccess(spinnerCheck) {
  console.log('onPieChartSpinnerSuccess',spinnerCheck);
  return {
    type: PIE_CHART_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//PIE CHART SPINNER
export function outPerformanceChartSuccess(spinnerCheck) {
  console.log('outPerformanceChartSuccess',spinnerCheck);
  return {
    type: OUTPERFORMANCE_CHART_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//WATERFALL CHART - ASDA SPINNER
export function waterChartAsdaSuccess(spinnerCheck) {
  console.log('waterChartAsdaSuccess',spinnerCheck);
  return {
    type: WATERFALL_CHART_ASDA_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//PRICE RANGE CHART - ASDA SPINNER
export function priceRangeChartSuccess(spinnerCheck) {
  console.log('priceRangeChartSuccess',spinnerCheck);
  return {
    type: PRICE_RANGE_CHART_SPINNER_SUCCESS,
    spinnerCheck
  }
}




