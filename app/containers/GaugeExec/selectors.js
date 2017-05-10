import { createSelector } from 'reselect';

/**
 * Direct selector to the gaugeExec state domain
 */
const selectGaugeExecDomain = () => (state) => state.get('gaugeExec');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GaugeExec
 */

const makeSelectGaugeExec = () => createSelector(
  selectGaugeExecDomain(),
  (substate) => substate.toJS()
);

export default makeSelectGaugeExec;
export {
  selectGaugeExecDomain,
};
