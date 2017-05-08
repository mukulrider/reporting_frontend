import { createSelector } from 'reselect';

/**
 * Direct selector to the executive state domain
 */
const selectExecutiveDomain = () => (state) => state.get('executive');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Executive
 */

const makeSelectExecutive = () => createSelector(
  selectExecutiveDomain(),
  (substate) => substate.toJS()
);

export default makeSelectExecutive;
export {
  selectExecutiveDomain,
};
