/*
 *
 * PricingScenarioTrackerPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {makePricingScenarioStatus} from './selectors';
import messages from './messages';
import Button from 'components/button';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import Spinner from 'components/spinner';
import {scenarioTracker} from './actions';
import {Modal} from 'react-bootstrap';

export class PricingScenarioTrackerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.onScenarioTracker();
  };

  constructor(props) {
    super(props);
    this.state = {smShow: false, lgShow: false};
  }

  render() {
    let lgClose = () => this.setState({lgShow: false});
    console.log(this.state);
    return (
      <div style={{fontSize: '14px'}}>
        <Helmet
          title="PricingScenarioTrackerPage"
          meta={[
            {name: 'description', content: 'Description of PricingScenarioTrackerPage'},
          ]}
        />

        {/*<Modal show={this.state.lgShow} bsSize="small" aria-labelledby="contained-modal-title-sm">*/}
        {/*<Modal.Header closeButton>*/}
        {/*<Modal.Title id="contained-modal-title-sm">*/}
        {/*<div style={{textAlign: 'center'}}><b>Rules Violation</b></div>*/}
        {/*</Modal.Title>*/}
        {/*</Modal.Header>*/}
        {/*<Modal.Body>*/}
        {/*<table className="table " style={{fontSize: '16px'}}>*/}
        {/*<thead>*/}
        {/*<tr>*/}
        {/*<td>Index</td>*/}
        {/*<td>Name</td>*/}
        {/*</tr>*/}
        {/*</thead>*/}
        {/*<tbody>*/}
        {/*<tr>*/}
        {/*<td>1</td>*/}
        {/*<td>Price more than x</td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*<td>2</td>*/}
        {/*<td>Price more than x</td>*/}
        {/*</tr>*/}
        {/*</tbody>*/}
        {/*</table>*/}
        {/*</Modal.Body>*/}
        {/*<Modal.Footer>*/}
        {/*<Button onClick={() => this.setState({lgShow: false})}>Close</Button>*/}
        {/*</Modal.Footer>*/}
        {/*</Modal>*/}

        <Modal show={this.state.lgShow} bsSize="small" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">
              <div style={{textAlign: 'center'}}><b>Rules Violation</b></div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table " style={{fontSize: '16px'}}>
              <thead style={{fontWeight: 700}}>
              <tr>
                <td>Sl. No.</td>
                <td>Rule</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>Product variants</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bigger pack, better value</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Own Label vs Branded</td>
              </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({lgShow: false})}
              style={{display: 'block', margin: '0 auto'}}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/*<Button bsStyle="primary" onClick={() => this.setState({lgShow: true})}>*/}
        {/*Launch large demo modal*/}
        {/*</Button>*/}

        <Panel>
          {/*<Button*/}
          {/*onClick={this.props.onGenerateFile}*/}
          {/*style={{float: 'right', margin: '20px 5px 20px 5px'}}>Assess Price Change</Button>*/}
          <h3 style={{textAlign: 'center', color: '#333'}}>View Forecasts</h3>
          <table className="table ">
            <thead className="" style={{fontWeight: '700', textAlign: 'center'}}>
            <tr>
              <td>Sl. No.</td>
              <td style={{textAlign: 'left'}}>Event</td>
              <td style={{textAlign: 'left'}}>Scenario</td>
              <td style={{textAlign: 'left'}}>Status</td>
              <td style={{textAlign: 'center'}}>Output</td>
              <td style={{textAlign: 'center'}}>Weeks</td>
              <td style={{textAlign: 'center'}}>Store Format</td>
              <td style={{textAlign: 'center'}}>Rule Viotation Count</td>
            </tr>
            </thead>
            <tbody>
            {(() => {
              if (this.props.pricingScenarioStatus) {
                return this.props.pricingScenarioStatus.map((obj,i) => {
                  return (
                    <tr>
                      {/*<td><Checkbox id={Math.random() + Date.now()}*/}
                                    {/*value={Math.random()} valid={true}/>*/}
                      {/*</td>*/}
                      <td>{i+1}</td>
                      <td>{obj.name}</td>
                      <td>{obj.scenario_name}</td>
                      <td>{obj.status ? 'Complete' : <span>Pending <Spinner/></span>}</td>
                      <td className="text-center">
                        {obj.status ?
                          <a href="/pricing/forecast/christmas-901/DepartmentLevelReportOutput_main-estate-7-mar-2017-bws-20170309_080826">
                            <Button >View</Button>
                          </a> :
                          <Button 
                                  buttonType={'secondary'}>Pending</Button>}
                      </td>
                      <td style={{textAlign: 'center'}}>{obj.weeks}</td>
                      <td style={{textAlign: 'center'}}>{obj.store_format}</td>
                      <td style={{textAlign: 'center'}}>
                        {obj.status ?
                          <button className="btn btn-danger" onClick={() => this.setState({lgShow: true})}>
                            3
                          </button> :
                          '-'
                        }

                      </td>
                    </tr>
                  )
                })
              }
            })()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }
}

PricingScenarioTrackerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pricingScenarioStatus: makePricingScenarioStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onScenarioTracker: (e) => dispatch(scenarioTracker(e))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingScenarioTrackerPage);
