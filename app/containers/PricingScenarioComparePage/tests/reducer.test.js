
import { fromJS } from 'immutable';
import pricingScenarioComparePageReducer from '../reducer';

describe('pricingScenarioComparePageReducer', () => {
  it('returns the initial state', () => {
    expect(pricingScenarioComparePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
