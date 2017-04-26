
import { fromJS } from 'immutable';
import pricingForecastPageReducer from '../reducer';

describe('pricingForecastPageReducer', () => {
  it('returns the initial state', () => {
    expect(pricingForecastPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
