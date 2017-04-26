/*
 *
 * PricingScenarioTrackerPage actions
 *
 */

import {
  DEFAULT_ACTION, SCENARIO_STATUS_SUCCESS, SCENARIO_STATUS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function scenarioTracker() {
  return {
    type: SCENARIO_STATUS,
  };
}
export function scenarioTrackerSuccess(data) {
  return {
    type: SCENARIO_STATUS_SUCCESS,
    data
  };
}
