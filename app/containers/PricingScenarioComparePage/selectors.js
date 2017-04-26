import { createSelector } from 'reselect';

/**
 * Direct selector to the pricingScenarioComparePage state domain
 */
const selectPricingScenarioComparePageDomain = () => (state) => state.get('pricingScenarioComparePage');

/**
 * Other specific selectors
 */

const makePricingScenarioData = () => createSelector(
  selectPricingScenarioComparePageDomain(),
  (pricingForecastState) => pricingForecastState.get('pricingScenarioComparison')
);

/**
 * Default selector used by PricingScenarioComparePage
 */

// const makeSelectPricingScenarioComparePage = () => createSelector(
//   selectPricingScenarioComparePageDomain(),
//   (substate) => substate.toJS()
// );

// export default makeSelectPricingScenarioComparePage;
export {
  makePricingScenarioData,
};
