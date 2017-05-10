
import { fromJS } from 'immutable';
import gaugeExecReducer from '../reducer';

describe('gaugeExecReducer', () => {
  it('returns the initial state', () => {
    expect(gaugeExecReducer(undefined, {})).toEqual(fromJS({}));
  });
});
