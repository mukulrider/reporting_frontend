import { createSelector } from 'reselect';

/**
 * Direct selector to the delistContainer state domain
 */
const selectDelistContainerDomain = () => (state) => state.get('delistContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DelistContainer
 */

const makeSelectDelistContainer = () => createSelector(
  selectDelistContainerDomain(),
  (substate) => substate.toJS()
);
const makeUrlParamsString = () => createSelector(
  selectDelistContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDelistContainer;
export {
  selectDelistContainerDomain, makeUrlParamsString
};
