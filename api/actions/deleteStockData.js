export default function deleteStockData(req) {
  const stockName = req.body.name;
  // delete from DB inside the Promise
  return Promise.resolve(stockName);
}
