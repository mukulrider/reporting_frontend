
import { fromJS } from 'immutable';
import pricingScenarioTrackerPageReducer from '../reducer';

describe('pricingScenarioTrackerPageReducer', () => {
  it('returns the initial state', () => {
    expect(pricingScenarioTrackerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
