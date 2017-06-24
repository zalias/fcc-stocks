import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadStock} from 'redux/modules/chart';
import Helmet from 'react-helmet';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import StockList from '../../components/StockList/StockList';

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
    const duplicate = this.props.chartConfig.series.filter((object) => {
      return object.name === input.value;
    });
    if (duplicate.length === 0) this.props.loadStock(input.value);
    input.value = '';
  }
  render() {
    const {chartConfig} = this.props; // eslint-disable-line no-shadow
    return (
      <div className="container">
        <h1>Map Page</h1>
        <Helmet title="Map Page"/>
        <ReactHighstock config={chartConfig} />
        <StockList />
        <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="stockName" placeholder="Example: MSFT" className="form-control"/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-plus-square"/>{' '}Add Ticker
            </button>
          </form>
      </div>
    );
  }
}
