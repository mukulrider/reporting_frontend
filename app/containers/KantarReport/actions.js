/*
 *
 * KantarReport actions
 *
 */

import {
  DEFAULT_ACTION,DEFAULT_KANTAR_FETCH,FETCH_KANTAR_DATA_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function generateKantarReport() {
  console.log('Default KantarReport Action Call');
  return {
    type: DEFAULT_KANTAR_FETCH ,
  };
}

export function fetchKantarDataSuccess(data) {
  console.log('Fetch Kantar Data Success');
  return {
    type: FETCH_KANTAR_DATA_SUCCESS ,
    data
  };
}
