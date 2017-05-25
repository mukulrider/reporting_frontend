/*
 *
 * KantarReport reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,DEFAULT_KANTAR_FETCH,FETCH_KANTAR_DATA_SUCCESS
} from './constants';

const initialState = fromJS({});

function kantarReportReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_KANTAR_DATA_SUCCESS:
      console.log("Reducer Fetch Kantar Data Success", action.data);
      return state.set('data', action.data)

    default:
      return state;
  }
}

export default kantarReportReducer;
