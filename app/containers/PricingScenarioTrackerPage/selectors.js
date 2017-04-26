import { createSelector } from 'reselect';

/**
 * Direct selector to the pricingScenarioTrackerPage state domain
 */
const selectPricingScenarioTrackerPageDomain = () => (state) => state.get('pricingScenarioTrackerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PricingScenarioTrackerPage
 */

const makePricingScenarioStatus = () => createSelector(
  selectPricingScenarioTrackerPageDomain(),
  (pricingForecastState) => pricingForecastState.get('pricingScenarioStatus')
);

export {
  makePricingScenarioStatus
};
