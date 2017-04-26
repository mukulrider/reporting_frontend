import { createSelector } from 'reselect';

/**
 * Direct selector to the pp state domain
 */
const selectPpDomain = () => (state) => state.get('pp');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Pp
 */

const makeSelectPp = () => createSelector(
  selectPpDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPp;
export {
  selectPpDomain,
};
