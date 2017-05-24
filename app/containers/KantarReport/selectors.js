import { createSelector } from 'reselect';

/**
 * Direct selector to the kantarReport state domain
 */
const selectKantarReportDomain = () => (state) => state.get('kantarReport');

/**
 * Other specific selectors
 */


/**
 * Default selector used by KantarReport
 */

const makeSelectKantarReport = () => createSelector(
  selectKantarReportDomain(),
  (substate) => substate.toJS()
);

export default makeSelectKantarReport;
export {
  selectKantarReportDomain,
};
