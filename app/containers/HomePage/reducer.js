/**
 * Created by musigma on 1/3/17.
 */
import { fromJS, Map as iMap, List as iList } from 'immutable';

import {AJAX_REQUEST, AJAX_REQUEST_SUCCESS,
  GENERATE_TABLE_SUCCESS, GENERATE_SIDE_FILTER_SUCCESS,
  GENERATE_URL_PARAMS, GENERATE_URL_PARAMS_STRING,
  GENERATE_TEXTBOX_QUERY_STRING, GENERATE_NEW_SCENARIO_STRING,
  GENERATE_NEW_SCENARIO_STORE_FORMAT, GENERATE_NEW_SCENARIO_WEEK} from './constants';

const initial_state = fromJS({
  username: 'saurav',
  userInputTable: [],
  urlParamsString: '',
  textBoxQueryString:'',
  newScenarioString: 'Christmas',
  newScenarioStoreFormat: 'Main Estate',
  newScenarioWeek: 1,
});

function homeReducer(state= initial_state, action) {
  switch (action.type) {
    case AJAX_REQUEST:
      // console.log(action);
      return state.set('username', 'changed ' + Date.now());
    case AJAX_REQUEST_SUCCESS:
      // console.log(AJAX_REQUEST_SUCCESS, action);
      return state.set('username', JSON.stringify(action.data) + ' ' + Date.now());
    case GENERATE_TABLE_SUCCESS:
      // console.log(action);
      return state.set('userInputTable', action.data);
    case GENERATE_SIDE_FILTER_SUCCESS:
      // console.log(action);
      return state.set('sideFilter', action.data);
    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);
    case GENERATE_TEXTBOX_QUERY_STRING:
      return state.set('textBoxQueryString', action.data);
    case GENERATE_NEW_SCENARIO_STRING:
      return state.set('newScenarioString', action.data);
    case GENERATE_NEW_SCENARIO_STORE_FORMAT:
      return state.set('newScenarioStoreFormat', action.data);
    case GENERATE_NEW_SCENARIO_WEEK:
      return state.set('newScenarioWeek', action.data);
    default:
      return state;
  }
}

export default homeReducer;
