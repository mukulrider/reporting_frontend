import { createSelector } from 'reselect';

/**
 * Direct selector to the userInputPage state domain
 */
const selectUserInputPageDomain = () => (state) => state.get('userInputPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserInputPage
 */

const makeSelectUserInputPage = () => createSelector(
  selectUserInputPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectUserInputPage;
export {
  selectUserInputPageDomain,
};
