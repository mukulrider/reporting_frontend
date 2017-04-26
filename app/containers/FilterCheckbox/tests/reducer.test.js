
import { fromJS } from 'immutable';
import filterCheckboxReducer from '../reducer';

describe('filterCheckboxReducer', () => {
  it('returns the initial state', () => {
    expect(filterCheckboxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
