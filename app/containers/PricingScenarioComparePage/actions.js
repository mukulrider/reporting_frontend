/*
 *
 * PricingScenarioComparePage actions
 *
 */

import {
  DEFAULT_ACTION, FETCH_SCENARIO_DATA, FETCH_SCENARIO_DATA_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchScenarioData() {
  console.log('fetchScenarioData');
  return {
    type: FETCH_SCENARIO_DATA,
  };
}

export function fetchScenarioDataSuccess(data) {
  return {
    type: FETCH_SCENARIO_DATA_SUCCESS,
    data
  };
}
