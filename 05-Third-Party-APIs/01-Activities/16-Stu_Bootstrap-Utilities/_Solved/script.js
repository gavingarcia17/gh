function logStockPrice() {
  setInterval(() => {
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=YOUR_API_KEY')
      .then(response => response.json())
      .then(data => console.log(`MSFT stock price: $${data['Global Quote']['05. price']}`))
      .catch(error => console.error(error));
  }, 10000);
}

logStockPrice();