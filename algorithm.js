const fs = require('fs')
const { DateTime } = require('luxon')
const fetchPrices = require('./fetchPrices')
const fetchState = require('./readCurrentState')
const trade = require('./trade')

async function run() {
    try {
        const nineDaySMA = await fetchPrices.fetchNineDay()
        const threeDaySMA = await fetchPrices.fetchThreeDay()
        const currentPrice = await fetchPrices.fetchCurrentPrice();

        const currentBid = Number(currentPrice.bid);
        const currentAsk = Number(currentPrice.ask);
        
        const currentOrders = await fetchState.fetchOrders();
        const currentState = await fetchState.fetchCurrentState();
        const currencyOwned = currentState.eth;

        const currentBuyableAmount = Number((50 / currentPrice.last).toFixed(5))
        let result;

        //Check if any orders are still in place from the previous cycle
        if (currentOrders.buyorders.length !== 0 || currentOrders.sellorders.length !== 0) {
            result = "Previous order has not yet been completed."
        }

        //If coin is currently owned, meaning 3-day SMA was previously above 9-day
        else if (currencyOwned) {
            //Check if 3-Day has dipped below 9-Day indicating down trend
            if (nineDaySMA > threeDaySMA) {
                //Sell current position
                await trade.sell(currencyOwned, currentBid);
                result = "Selling current position."
            }
            else {
                result = "Holding current position."
            }
            //Else do nothing, upward trend appears to be continuing
        }
        //Otherwise, if coin is not currently owned, meaning the 3-day was below the 9-day
        else {
            //Check if 3-day has risen above 9-day indicating up trend
            if (threeDaySMA > nineDaySMA) {
                //Buy ~$50 position
                await trade.buy(currentBuyableAmount, currentAsk);
                result = "Buying a position."
            }
            else {
                result = "Staying out of market."
            }
            //Else do nothing, downward trend appears to be continuing
        }

        //Write results to log file
        fs.appendFile("results.txt", `${DateTime.now().toLocaleString(DateTime.DATETIME_FULL)} | ${result}
`, (err) => {
            if (err) {
              console.log(err);
            }
        });
    } catch (error) {
        //Write exception to log file
        fs.appendFile("results.txt", `${DateTime.now().toLocaleString(DateTime.DATETIME_FULL)} | ${error}
`, (err) => {
            if (err) {
              console.log(err);
            }
        });
    }
}

module.exports = { 
    run: run 
}