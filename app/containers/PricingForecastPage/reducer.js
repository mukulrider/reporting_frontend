/*
 *
 * PricingForecastPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, FETCH_GRAPH_DATA_SUCCESS, SELECTED_TYPE
} from './constants';

const initialState = fromJS({pricingGraphData: [], pricingForecastSelectedType: 'departmentlevel'});

function pricingForecastPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_GRAPH_DATA_SUCCESS:
      return state.set('pricingGraphData', action.data[0]);
    case SELECTED_TYPE:
      return state.set('pricingForecastSelectedType', action.data);
    default:
      return state;
  }
}

export default pricingForecastPageReducer;
