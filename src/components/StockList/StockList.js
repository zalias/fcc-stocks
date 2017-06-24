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
        {stockList.map((dataSet) => {
          return (
            <button className="btn btn-primary" key={dataSet.name}>
              {dataSet.name + ' '}
              <i className="fa fa-window-close" onClick={() => this.handleSubmit(dataSet.name)}/>
            </button>
          );
        })}
      </div>
    );
  }
}
