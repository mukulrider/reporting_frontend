
import { fromJS } from 'immutable';
import userInputPageReducer from '../reducer';

describe('userInputPageReducer', () => {
  it('returns the initial state', () => {
    expect(userInputPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
