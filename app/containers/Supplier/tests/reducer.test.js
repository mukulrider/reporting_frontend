
import { fromJS } from 'immutable';
import supplierReducer from '../reducer';

describe('supplierReducer', () => {
  it('returns the initial state', () => {
    expect(supplierReducer(undefined, {})).toEqual(fromJS({}));
  });
});
