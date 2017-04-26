/*
 *
 * PricingScenarioComparePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, FETCH_SCENARIO_DATA_SUCCESS
} from './constants';

const initialState = fromJS({pricingScenarioComparison: []});

function pricingScenarioComparePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_SCENARIO_DATA_SUCCESS:
      return state.set('pricingScenarioComparison', fromJS(action.data));
    default:
      return state;
  }
}

export default pricingScenarioComparePageReducer;
