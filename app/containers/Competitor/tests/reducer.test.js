
import { fromJS } from 'immutable';
import competitorReducer from '../reducer';

describe('competitorReducer', () => {
  it('returns the initial state', () => {
    expect(competitorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
