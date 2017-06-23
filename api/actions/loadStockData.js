import axios from 'axios';
export default function loadStockData(req) {
  const stockName = req.body.name;
  const url = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20150101&date.lt=20160101&ticker=' + stockName + '&qopts.columns=ticker,date,close&api_key=hDPZMxTuy3Ex8vg5QYzb';
  return axios.get(url)
    .then(result =>{
      const stockTable = result.data.datatable.data;
      console.log(stockTable);
      if (stockTable.length === 0) return Promise.reject('NOT_FOUND');
      const data = stockTable.map((dataPoint) => {
        dataPoint.shift();
        dataPoint[0] = (new Date(dataPoint[0])).getTime();
        return dataPoint;
      });
      console.log(data);
      const answer = {
        name: stockName,
        data,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };
      return Promise.resolve(answer);
    })
    .catch(error => { console.error(error); return Promise.reject(error); });
}
