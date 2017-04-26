/*
 *
 * PricingForecastPage actions
 *
 */

import {
  DEFAULT_ACTION, FETCH_GRAPH_DATA, FETCH_GRAPH_DATA_SUCCESS, SELECTED_TYPE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchGraphData() {
  return {
    type: FETCH_GRAPH_DATA,
  };
}

export function selectedType(data) {
  console.log(data);
  return {
    type: SELECTED_TYPE,
    data
  };
}

export function fetchGraphDataSuccess(data) {
  return {
    type: FETCH_GRAPH_DATA_SUCCESS,
    data
  };
}
