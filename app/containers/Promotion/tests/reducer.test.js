
import { fromJS } from 'immutable';
import promotionReducer from '../reducer';

describe('promotionReducer', () => {
  it('returns the initial state', () => {
    expect(promotionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
