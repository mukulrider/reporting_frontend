/*
 *
 * KantarReport actions
 *
 */

import {
  DEFAULT_ACTION,WEEK,CATEGORY,RETAILER,SUPPLIER,
  WEEK_FILTER,HIERARCHY_FILTER,
  KANTAR_DATA_CONSTANT,
  WEEK_FILTER_DATA_SUCCESS_CONSTANT,HIERARCHY_FILTER_DATA_SUCCESS_CONSTANT,
  KANTAR_DATA_SUCCESS_CONSTANT
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveWeek(data) {
  console.log('SaveWeek = actions', data);
  return {
    type: WEEK,
    data,
  };
}

export function saveCategory(data) {
  console.log('SaveWeek = actions', data);
  return {
    type: CATEGORY,
    data,
  };
}

export function saveRetailer(data) {
  console.log('SaveWeek = actions', data);
  return {
    type: RETAILER,
    data,
  };
}

export function saveSupplier(data) {
  console.log('Savesupplier = actions', data);
  return {
    type: SUPPLIER,
    data,
  };
}

export function kantarDataCall() {
  console.log('KantarReport Action Call');
  return {
    type: KANTAR_DATA_CONSTANT ,
  };
}

export function generateWeekData() {
  console.log('Week Data Action');
  return {
    type: WEEK_FILTER ,
  };
}
export function generateHierarchyData() {
  console.log('Hierarchy Data Action');
  return {
    type: HIERARCHY_FILTER ,
  };
}
export function fetchWeekFilterDataSuccess(data) {
  console.log('Fetch Week Filter Data Success');
  return {
    type: WEEK_FILTER_DATA_SUCCESS_CONSTANT ,
    data
  };
}
export function fetchHierarchyFilterDataSuccess(data) {
  console.log('Fetch Hierarchy Filter Data Success');
  return {
    type: HIERARCHY_FILTER_DATA_SUCCESS_CONSTANT ,
    data
  };
}

export function fetchKantarDataSuccess(data) {
  console.log('Fetch Kantar Data Success');
  return {
    type: KANTAR_DATA_SUCCESS_CONSTANT ,
    data
  };
}
