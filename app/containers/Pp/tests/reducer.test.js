
import { fromJS } from 'immutable';
import ppReducer from '../reducer';

describe('ppReducer', () => {
  it('returns the initial state', () => {
    expect(ppReducer(undefined, {})).toEqual(fromJS({}));
  });
});
