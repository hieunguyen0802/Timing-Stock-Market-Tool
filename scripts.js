

let companyForm = document.getElementById("companyForm");
companyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let companyCode = document.getElementById("companyCode").value;
  console.log(companyCode);

  async function fetchData() {
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';


    const response = await fetch(url
      //`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${companyCode}&apikey=5UUL3TN6KQ737G9F`
    );
    console.log(response);
    const record = await response.json();
    if (response.status === 200) {
     
      const data = Object.values(record);
      console.log(data,"Fdsfa")

      const singleRecord = Object.values(data[1]);
      console.log(singleRecord)
      let priceList = [];
      singleRecord.forEach((item) => {
        const prices = Object.values(item);
        priceList.push(prices[1]);
      });

      const result = [ Math.max(...priceList), Math.min(...priceList), maxProfit(priceList)];
      console.log(result);
      
      document.getElementById("max").innerHTML = result[0];
      document.getElementById("min").innerHTML = result[1];
      document.getElementById("profit").innerHTML = result[2];

    } else {
      console.log(object)("Error, please try again !");
    }
  }

  fetchData();
});

// const response = await fetch ("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo");
// const record = await response.json();
// const data = Object.values(record)
// const singleRecord = Object.values(data[1])
// let priceList = [];
// singleRecord.forEach((item) => {
//     const prices = Object.values(item)
//     priceList.push(prices[1])
// })

// const result = [Math.max(...priceList), Math.min(...priceList), maxProfit(priceList)]
// console.log(result)

// document.getElementById("max").innerHTML=result[0];
// document.getElementById("min").innerHTML=result[1];
// document.getElementById("profit").innerHTML=result[2];

var maxProfit = function (prices) {
  if (prices == null || prices.length <= 1) return 0;
  let minBuy = prices[0];
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    minBuy = Math.min(minBuy, prices[i]);
    profit = Math.max(profit, prices[i] - minBuy);
  }
  return profit;
};
