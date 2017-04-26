/*
 *
 * DelistContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  API_FETCH,
  API_FETCH_SUCCESS,
  DATA_URL_PARAMS,
  WEEK_URL,
  TABLE_DATA_FETCH,
  TABLE_DATA_FETCH_SUCCESS,
  SUBSTITUTE_DATA_URL,
  SUPPLIER_IMPACT_TABLE_DATA_URL,
  GENERATE_TABLE,
  GENERATE_TABLE_SUCCESS,
  GENERATE_SIDE_FILTER,
  GENERATE_SIDE_FILTER_SUCCESS,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  WATERFALL_VALUE,
  WATERFALL_VALUE_SUCCESS,
  SUBSTITUTE_DATA_URL_SUCCESS,
  TEST_AJAX,
  TEST_AJAX_SUCCESS,
  SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS,

} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function apiFetch() {
  return {
    type: API_FETCH,
  };
}

export function WeekClick(data) {
  return {
    type: WEEK_URL,
    data,
  };
}

export function TableDataFetch(data) {
  return {
    type: TABLE_DATA_FETCH,
    data,
  };
}

// DELIST POPUP TABLE
export function DelistPopupTableDataFetchSuccess(data) {
  return {
    type: DELIST_POPUP_TABLE_DATA_FETCH_SUCCESS,
    data,
  };
}

// SUPPLIER POPUP TABLE
export function SupplierPopupTableDataFetchSuccess(data) {
  console.log('data in action for ajax table', data);
  return {
    type: SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS,
    data,
  };
}


export function apiFetchSuccess(data) {
  return {
    type: API_FETCH_SUCCESS,
    data,
  };
}

export function dataUrlParams(data) {
  return {
    type: DATA_URL_PARAMS,
    data,
  };
}

// DELIST POPUP TABLE
export function SubstitutesClick(data) {
  return {
    type: SUBSTITUTE_DATA_URL,
    data,
  };
}

export function SupplierImpactTableClick(data) {
  console.log('SupplierImpactTableClick', data);
  return {
    type: SUPPLIER_IMPACT_TABLE_DATA_URL,
    data,
  };
}

export function SubstitutesClickSuccess(data) {
  return {
    type: SUBSTITUTE_DATA_URL_SUCCESS,
    data,
  };
}

// WATERFALL CHART - VALUE
export function WaterfallValueChart(data) {
  return {
    type: WATERFALL_VALUE,
  };
}

export function WaterfallValueChartSuccess(data) {
  return {
    type: WATERFALL_VALUE_SUCCESS,
    data,
  };
}

// FILTERS

export function generateTable() {
  return {
    type: GENERATE_TABLE,
  };
}

export function generateTableSuccess(data) {
  return {
    type: GENERATE_TABLE_SUCCESS,
    data,
  };
}
export function generateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER,
  };
}

export function generateSideFilterSuccess(data) {
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data,
  };
}

export function generateUrlParams(data) {
  return {
    type: GENERATE_URL_PARAMS,
    data,
  };
}
export function generateUrlParamsString(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data,
  };
}

// TESTING AJAX CALL

export function ajaxClick(data) {
  return {
    type: TEST_AJAX,
    data,
  };
}

export function ajaxFetchSuccess(data) {
  return {
    type: TEST_AJAX_SUCCESS,
    data,
  };
}
