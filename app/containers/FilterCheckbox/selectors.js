import { createSelector } from 'reselect';

/**
 * Direct selector to the filterCheckbox state domain
 */
const selectFilterCheckboxDomain = () => (state) => state.get('filterCheckbox');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FilterCheckbox
 */

const makeSelectFilterCheckbox = () => createSelector(
  selectFilterCheckboxDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFilterCheckbox;
export {
  selectFilterCheckboxDomain,
};
