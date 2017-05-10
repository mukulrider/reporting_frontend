/**
*
* TopBottom
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TopBottom extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="pull-right">
            <Button onClick={() => {
              suppName='None';
              this.props.onSaveSupplierName(suppName);
              this.setState({botsuppInfo: true});

              {/*Load functions here*/}

            }}>Supplier Info</Button>
          </div>
        </div>

        {(() => {
          if (this.props.Executive.worst_info_data) {
            return (
              <div>

                {/*Row for KPIs*/}
                <h3>worst info data exists</h3>
                <div className="row">
                  <div className="panel-body">
                    <div className="col-xs-4 kpiSmall">


                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.worst_info_data.yoy_var > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.worst_info_data.yoy_var < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>{this.props.Executive.worst_info_data.yoy_var}%
                      </h3>
                      <h4 className="kpiSubTitle">YoY</h4>

                    </div>
                    <div className="col-xs-4 kpiSmall">

                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.worst_info_data.cont_to_grwth > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.worst_info_data.cont_to_grwth < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                        {this.props.Executive.worst_info_data.cont_to_grwth}%
                      </h3>
                      <h4 className="kpiSubTitle">Contri to growth</h4>

                    </div>
                    <div className="col-xs-4 kpiSmall">

                      <h3>

                        {this.props.Executive.worst_info_data}%
                      </h3>
                      <h4 className="kpiSubTitle">Sales Share</h4>

                    </div>
                  </div>
                </div>
                {/*Row for Multiline Chart*/}
                <div className="row">
                  <div className="col-xs-12">


                    {/*<MultilinePromo data={this.props.Executive.worst_info_data.multiline_trend}*/}
                    {/*id="top_trend"*/}
                    {/*label_ty={this.props.Executive.worst_info_data.legend1}*/}
                    {/*label_ly={this.props.Executive.worst_info_data.legend2}*/}
                    {/*xaxis_title="Tesco Week"*/}
                    {/*no_pref={this.props.Executive.worst_info_data.no_pref}*/}
                    {/*no_suffix=''*/}
                    {/*yaxis_title={this.props.Executive.worst_info_data.kpi_type} />*/}




                  </div>
                </div>
              </div>
            )
          }
        })()}


      </div>
    );
  }
}

TopBottom.propTypes = {

};

export default TopBottom;
