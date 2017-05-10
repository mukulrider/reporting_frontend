/*
 *
 * ProductPage actions
 *
 */

import {
  DEFAULT_ACTION, API_FETCH, API_FETCH_SUCCESS,SAVE_WEEK_PARAM,SAVE_METRIC_PARAM,FETCH_SAVE_WEEK_PARAM,FETCH_SAVE_WEEK_PARAM_SUCCESS,
  FETCH_SAVE_METRIC_PARAM_SUCCESS,GENERATE_URL_PARAMS_STRING,GENERATE_SIDE_FILTER,GENERATE_SIDE_FILTER_SUCCESS,FETCH_FILTERED_PRODUCT_DATA,
  WEEK_FILTER_CONSTANT, WEEK_FILTER_FETCH_SUCCESS,CHECKBOX_WEEK_CHANGE, WEEK
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function productPageValues() {
  console.log('Fetching Filtered Product Page Values');
  return {
    type: FETCH_FILTERED_PRODUCT_DATA ,
  };
}

export function saveWeekParam(data) {
  console.log('Saving week params in action');
  console.log(data);
  return {
    type: SAVE_WEEK_PARAM ,
    data
  };
}

export function saveMetricParam(data) {
  console.log('Saving metric params in action');
  console.log(data);
  return {
    type: SAVE_METRIC_PARAM ,
    data
  };
}

export function fetchSaveWeekParam() {
  console.log('fetchSaveWeekParams');

  return {
    type: FETCH_SAVE_WEEK_PARAM
  };
}

export function fetchSaveWeekParamSuccess(data) {
  console.log('Saving complete data in action');
  console.log(data);
  return {
    type: FETCH_SAVE_WEEK_PARAM_SUCCESS ,
    data
  };
}


export function generateSideFilterSuccess(data) {
  console.log("SideFilterData:",data);
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data,
  };
}

export function generateUrlParamsString(data) {
  console.log("Saving Action data & sending constant to reducer:",data);
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  }
}
export function generateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER
  }
}


export function apiFetch() {
  console.log('apiFetch action');
  return {
    type: API_FETCH,
  };
}

export function apiFetchSuccess(data) {
  console.log('apiFetchSuccess action', data);
  return {
    type: API_FETCH_SUCCESS,
    data,
  };
}

//FOR WEEK FILTER DATA

export function WeekFilterFetchSuccess(data)
{
  console.log('WeekFilterFetchSuccess = actions', data);
  return {
    type: WEEK_FILTER_FETCH_SUCCESS,
    data,
  };
}

export function SaveWeek(data) {
  console.log('SaveWeek = actions',data);
  return {
    type: WEEK,
    data,
  };
}

export function checkboxWeekChange(data) {
  console.log("checkboxWeekChange Selection in actions" + data);
  return {
    type: CHECKBOX_WEEK_CHANGE,
    data
  };
}

export function getWeekFilter()
{
  console.log('actions.js getWeekFilter',WEEK_FILTER_CONSTANT);
  return {
    type: WEEK_FILTER_CONSTANT,
  };
}



