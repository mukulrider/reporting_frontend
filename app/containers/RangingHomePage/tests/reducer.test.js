
import { fromJS } from 'immutable';
import rangingHomePageReducer from '../reducer';

describe('rangingHomePageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingHomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
