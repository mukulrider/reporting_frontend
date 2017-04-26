
import { fromJS } from 'immutable';
import delistContainerReducer from '../reducer';

describe('delistContainerReducer', () => {
  it('returns the initial state', () => {
    expect(delistContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
