
import { fromJS } from 'immutable';
import pricingHomePageReducer from '../reducer';

describe('pricingHomePageReducer', () => {
  it('returns the initial state', () => {
    expect(pricingHomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
