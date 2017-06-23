import axios from 'axios';
export default function loadStockData() {
  const url = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20150101&date.lt=20160101&ticker=MSFT&qopts.columns=ticker,date,close&api_key=hDPZMxTuy3Ex8vg5QYzb';
  return axios.get(url)
    .then(result =>{
      const data = result.data.datatable.data.map((dataPoint) => {
        dataPoint.shift();
        dataPoint[0] = (new Date(dataPoint[0])).getTime();
        return dataPoint;
      });
      console.log(data);
      const answer = {
        name: 'MSFT',
        data
      };
      return Promise.resolve(answer);
    })
    .catch(error => { console.error(error); return Promise.reject(error); });
}

/* export default function loadStockData() {
  return new Promise((resolve) => {
    resolve({
      name: 'USD to EUR',
      data: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16]],
      id: 'dataseries'
    });
  });
}*/
