/*
 *
 * RangingHomePage actions
 *
 */

import {
  DEFAULT_ACTION,API_FETCH, API_FETCH_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
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
      data
  };
}
