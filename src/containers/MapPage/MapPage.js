import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactHighstock from 'react-highcharts/ReactHighstock';

export default class StockPage extends Component {

  state = {
    showKitten: false,
    configs: {
      rangeSelector: {
        selected: 1

      },
      title: {
        text: 'Stocks'

      },
      tooltip: {
        style: {
          width: '500px'

        },
        valueDecimals: 4,
        shared: true

      },
      yAxis: {
        title: {
          text: ''

        }

      },
      series: [{
        name: 'USD to EUR',
        data: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16]],
        id: 'dataseries'

      }, {
        name: 'EUR to EUR',
        data: [[1220832000000, 22.56], [1220918400000, 21.67]],
        id: 'dataseries1'

      }]

    }
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    return (
      <div className="container">
        <h1>Map Page</h1>
        <Helmet title="Map Page"/>
        <ReactHighstock config={this.state.configs} />
      </div>
    );
  }
}
