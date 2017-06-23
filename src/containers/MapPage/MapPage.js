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

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.stockName;
    this.props.loadStock(input.value);
    input.value = '';
  }
  render() {
    const {chartConfig} = this.props; // eslint-disable-line no-shadow
    return (
      <div className="container">
        <h1>Map Page</h1>
        <Helmet title="Map Page"/>
        <ReactHighstock config={chartConfig} />
        <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="stockName" placeholder="Enter a username" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Submit Ticker
            </button>
          </form>
      </div>
    );
  }
}
