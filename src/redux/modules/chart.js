const LOAD = 'redux-example/chart/LOAD';
const LOAD_SUCCESS = 'redux-example/chart/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/chart/LOAD_FAIL';
const DELETE_STOCK = 'redux-example/chart/DELETE_STOCK';
const DELETE_STOCK_SUCCESS = 'redux-example/chart/DELETE_STOCK_SUCCESS';
const DELETE_STOCK_FAIL = 'redux-example/chart/DELETE_STOCK_FAIL';

const initialState = {
  config: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Stock Prices for 2015'
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
      socket.emit('stockAdded', {
        message: action.result.name
      });
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
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
    case DELETE_STOCK:
      return {
        ...state,
        loading: true
      };
    case DELETE_STOCK_SUCCESS:
      // delete the stock from state.config.series
      const stockToDelete = action.result;
      const newSeries = [...state.config.series].filter((object) => {
        return object.name !== stockToDelete;
      });
      return {
        ...state,
        loading: false,
        loaded: true,
        config: { ...state.config,
          series: newSeries
        }
      };
    case DELETE_STOCK_FAIL:
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

export function deleteStock(name) {
  return {
    types: [DELETE_STOCK, DELETE_STOCK_SUCCESS, DELETE_STOCK_FAIL],
    promise: (client) => client.post('/deleteStockData', {
      data: {
        name: name
      }
    })
  };
}
