/*
 *
 * RangingHomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, API_FETCH_SUCCESS} from './constants';

const initialState = fromJS({name: 'saurav', group2: [
    {
        product_code: 5600785,
        product_name: 'English Wine',
        volume: 569873,
        sales: 498373,
        buyer: 'John',
        supplier: 'Rob'
    },
    {
        product_code: 5600785,
        product_name: 'English Wine',
        volume: 569873,
        sales: 498373,
        buyer: 'John',
        supplier: 'Rob'
    },
    {
        product_code: 5600785,
        product_name: 'English Wine',
        volume: 569873,
        sales: 498373,
        buyer: 'John',
        supplier: 'Rob'
    }]});

function rangingHomePageReducer(state = initialState, action) {
  switch (action.type) {
    case API_FETCH_SUCCESS:
        console.log(API_FETCH_SUCCESS, 'reducer', action);
        return state.set('data', action.data);

    default:
      return state;
  }
}

export default rangingHomePageReducer;
