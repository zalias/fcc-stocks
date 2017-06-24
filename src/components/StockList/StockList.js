import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteStock} from 'redux/modules/chart';

@connect(state => ({stockList: state.chart.config.series}),
  dispatch => bindActionCreators({deleteStock}, dispatch))
export default class StockList extends Component {
  static propTypes = {
    stockList: PropTypes.array,
    deleteStock: PropTypes.func.isRequired
  }

  handleSubmit = (name) => {
    this.props.deleteStock(name);
  }

  render() {
    const {stockList} = this.props; // eslint-disable-line no-shadow

    return (
      <div className="well">
        {(stockList.length === 0) && <span>Add Some Tickers</span>}
        {stockList.map((dataSet) => {
          return (
            <div className="btn-group btn-group-lg" >
              <button type="button" className="btn btn-default" style={{borderTopColor: dataSet.color, borderTopWidth: '5px'}}>{dataSet.name}</button>
              <button type="button" className="btn btn-default" style={{borderTopColor: dataSet.color, borderTopWidth: '5px'}} onClick={() => this.handleSubmit(dataSet.name)}>
               &times;
              </button>
            </div>
            );
        })}
      </div>
    );
  }
}
