/**
 *
 * TopFilterSupplierBrand
 *
 */

import React from 'react';
import SelectInput from 'components/select_input';

// import styled from 'styled-components';


class TopFilterSupplierBrand extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let week_data = []


    return (
      <div>
        <div className="row">
          <div className="col-xs-0"></div>
          <div className="col-xs-12">
            <SelectInput label={'brand'} name={'brand'} id={'brand_select'}
                         data={[{rowText: 'ALL BRANDS'}, {rowText: 'BRAND'}, {rowText: 'OL'}]}
                         valid
                         fieldBlurred={() => {
                           {/*console.log('field blurred');*/
                           }
                         }}
                         valueUpdated={(e, v) => {
                           {/*console.log('value updated');*/
                           }
                           // console.log(e.target.value);

                           if (v == 'ALL BRANDS') {
                             this.props.supplierViewKpiSpinnerCheck(0);
                             this.props.barChartSpinnerCheck(0);
                             this.props.onSaveBrandFilterParam('brand_indicator=BRAND&brand_indicator=OL');
                             this.props.onKPIBox();
                             this.props.ontopBottomChart();

                           } else {
                             this.props.supplierViewKpiSpinnerCheck(0);
                             this.props.barChartSpinnerCheck(0);
                             this.props.onSaveBrandFilterParam('brand_indicator=' + v);
                             this.props.onKPIBox();
                             this.props.ontopBottomChart();
                           }
                         }}/>
          </div>
        </div>

      </div>
    );
  }
}

TopFilterSupplierBrand.propTypes = {};

export default TopFilterSupplierBrand;
