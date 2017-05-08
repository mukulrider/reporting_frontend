
import { fromJS } from 'immutable';
import executiveReducer from '../reducer';

describe('executiveReducer', () => {
  it('returns the initial state', () => {
    expect(executiveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
