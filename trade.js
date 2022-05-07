var coinspot = require('coinspot-api');
require('dotenv').config()

async function buy(amount, rate) {
    const secret = process.env.COINSPOT_API_KEY
    const key = process.env.COINSPOT_API_SECRET

    const client = new coinspot(secret, key)

    return new Promise((resolve, reject) => {
        client.buy(`${process.env.SYMBOL}`, amount, rate, (error, data) => {
            if (error) {
                reject("Could not place buy order.");
            }
            else {
                if (JSON.parse(data)["status"] === "ok") {
                    resolve("Buy order placed.")
                }
                else (
                    reject("Could not place buy order.")
                )
            }
        })
    })
}

async function sell(amount, rate) {
    const secret = process.env.COINSPOT_API_KEY
    const key = process.env.COINSPOT_API_SECRET

    const client = new coinspot(secret, key)

    return new Promise((resolve, reject) => {
        client.sell(`${process.env.SYMBOL}`, amount, rate, (error, data) => {
            if (error) {
                reject("Could not place sell order.");
            }
            else {
                if (JSON.parse(data)["status"] === "ok") {
                    resolve("Sell order placed.")
                }
                else (
                    reject("Could not place sell order.")
                )
            }
        })
    })
}

module.exports = {
    buy: buy,
    sell: sell,
}


