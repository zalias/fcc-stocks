import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadStock} from 'redux/modules/chart';
import Helmet from 'react-helmet';
import ReactHighstock from 'react-highcharts/ReactHighstock';

@connect(
  state => ({chartConfig: state.chart.config}),
  dispatch => bindActionCreators({loadStock}, dispatch))

export default class MapPage extends Component {
  static propTypes = {
    chartConfig: PropTypes.object,
    loadStock: PropTypes.func.isRequired
  }
  render() {
    const {chartConfig, loadStock} = this.props; // eslint-disable-line no-shadow
    return (
      <div className="container">
        <h1>Map Page</h1>
        <Helmet title="Map Page"/>
        <ReactHighstock config={chartConfig} />
        <button className="btn btn-primary" onClick={loadStock}>Reload from server</button>
      </div>
    );
  }
}
