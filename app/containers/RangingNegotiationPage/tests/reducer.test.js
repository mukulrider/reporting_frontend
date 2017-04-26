
import { fromJS } from 'immutable';
import rangingNegotiationPageReducer from '../reducer';

describe('rangingNegotiationPageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingNegotiationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
