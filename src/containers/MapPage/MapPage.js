import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadStock} from 'redux/modules/chart';
import Helmet from 'react-helmet';
import NotificationSystem from 'react-notification-system';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import StockList from '../../components/StockList/StockList';

@connect(
  state => ({chart: state.chart}),
  dispatch => bindActionCreators({loadStock}, dispatch))

export default class MapPage extends Component {
  static propTypes = {
    chart: PropTypes.object,
    loadStock: PropTypes.func.isRequired
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    if (socket) {
      socket.on('stockAdded', this.onMessageReceived);
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('stockAdded', this.onMessageReceived);
    }
  }

  onMessageReceived = (data) => {
    const message = data.message;
    this._notificationSystem.addNotification({
      title: 'Anonymous added ' + message,
      level: 'info',
      position: 'bl',
      dismissable: 'true',
      autoDismiss: 7
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.stockName.value.toUpperCase();
    const duplicate = this.props.chart.config.series.filter((object) => {
      return object.name === input;
    });
    if (duplicate.length === 0) {
      this.props.loadStock(input);
    } else {
      this._notificationSystem.addNotification({
        title: 'Already added ' + input + '.',
        level: 'error',
        position: 'bl',
        dismissable: 'true',
        autoDismiss: 7
      });
    }
    this.refs.stockName.value = '';
  }
  render() {
    const {chart} = this.props; // eslint-disable-line no-shadow
    return (
      <div className="container">
        <Helmet title="Stocks"/>
        <NotificationSystem ref="notificationSystem" />
        <ReactHighstock config={chart.config} />
        <StockList />
        <div style={{textAlign: 'center'}}>
        <form className="login-form form-inline">
            <div className="form-group">
              <input type="text" ref="stockName" placeholder="Example: MSFT" className="form-control"/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}><i className="fa fa-plus-square"/>{' '}Add Ticker
            </button>
          </form>
          {chart.error && <p style={{color: 'red', fontWeight: 'bold'}}>* {chart.error}</p>}
        </div>
      </div>
    );
  }
}
