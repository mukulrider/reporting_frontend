
import { fromJS } from 'immutable';
import kantarReportReducer from '../reducer';

describe('kantarReportReducer', () => {
  it('returns the initial state', () => {
    expect(kantarReportReducer(undefined, {})).toEqual(fromJS({}));
  });
});
