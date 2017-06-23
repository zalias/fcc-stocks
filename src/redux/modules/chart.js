const LOAD = 'redux-example/chart/LOAD';
const LOAD_SUCCESS = 'redux-example/chart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/chart/LOAD_FAIL';

const initialState = {
  config: {
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
    series: []
  }
};

export default function chart(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        config: { ...state.config,
          series: [...state.config.series, action.result]
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.chart && globalState.chart.loaded;
}

export function loadStock(name) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/loadStockData', {
      data: {
        name: name
      }
    })
  };
}
