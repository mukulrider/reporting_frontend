/*
 *
 * PricingScenarioTrackerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SCENARIO_STATUS_SUCCESS
} from './constants';

const initialState = fromJS({pricingScenarioStatus: []});

function pricingScenarioTrackerPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SCENARIO_STATUS_SUCCESS:
      return state.set('pricingScenarioStatus', action.data);
    default:
      return state;
  }
}

export default pricingScenarioTrackerPageReducer;
