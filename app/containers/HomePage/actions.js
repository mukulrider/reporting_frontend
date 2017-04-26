/**
 * Created by musigma on 1/3/17.
 */
import {
  AJAX_REQUEST, AJAX_REQUEST_SUCCESS, AJAX_REQUEST_ERROR,
  GENERATE_TABLE, GENERATE_TABLE_SUCCESS,
  GENERATE_SIDE_FILTER, GENERATE_SIDE_FILTER_SUCCESS, GENERATE_URL_PARAMS,
  GENERATE_FILE, GENERATE_URL_PARAMS_STRING, GENERATE_TEXTBOX_QUERY_STRING,
  GENERATE_SCENARIO, GENERATE_NEW_SCENARIO_STRING, GENERATE_NEW_SCENARIO_STORE_FORMAT,
  GENERATE_NEW_SCENARIO_WEEK
} from './constants'

export function ajaxRequest() {
  return {
    type: AJAX_REQUEST
  }
}

export function ajaxRequestSuccess(data) {
  return {
    type: AJAX_REQUEST_SUCCESS,
    data
  }
}

export function ajaxRequestError() {
  return {
    type: AJAX_REQUEST_ERROR
  }
}

export function generateFile() {
  return {
    type: GENERATE_FILE
  }
}

export function generateTable() {
  return {
    type: GENERATE_TABLE
  }
}

export function generateTableSuccess(data) {
  return {
    type: GENERATE_TABLE_SUCCESS,
    data
  }
}
export function generateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER
  }
}

export function generateSideFilterSuccess(data) {
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data
  }
}

export function fetchTable() {
  return {
    type: GENERATE_SIDE_FILTER
  }
}

export function fetchTableSuccess(data) {
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data
  }
}

export function generateUrlParams(data) {
  // console.log(data);
  return {
    type: GENERATE_URL_PARAMS,
    data
  }
}
export function generateUrlParamsString(data) {
  // console.log(data);
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  }
}

export function generateTextBoxQueryString(data) {
  // console.log(data);
  return {
    type: GENERATE_TEXTBOX_QUERY_STRING,
    data
  }
}
export function generateScenario(data) {
  return {
    type: GENERATE_SCENARIO,
    data
  }
}
export function generateNewScenarioString(data) {
  return {
    type: GENERATE_NEW_SCENARIO_STRING,
    data
  }
}

export function generateNewScenarioStoreFormat(data) {
  return {
    type: GENERATE_NEW_SCENARIO_STORE_FORMAT,
    data
  }
}

export function generateNewScenarioWeek(data) {
  return {
    type: GENERATE_NEW_SCENARIO_WEEK,
    data
  }
}
