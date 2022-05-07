var coinspot = require('coinspot-api');
require('dotenv').config()

async function fetchCurrentState() {
    const secret = process.env.COINSPOT_API_KEY
    const key = process.env.COINSPOT_API_SECRET

    const client = new coinspot(secret, key)

    return new Promise((resolve, reject) => {
        client.balances((error, data) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(JSON.parse(data).balance)
            }
        })
    })
}

async function fetchOrders() {
    const secret = process.env.COINSPOT_API_KEY
    const key = process.env.COINSPOT_API_SECRET

    const client = new coinspot(secret, key)

    return new Promise((resolve, reject) => {
        client.myorders((error, data) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(JSON.parse(data))
            }
        })
    })
}

module.exports = {
    fetchCurrentState: fetchCurrentState,
    fetchOrders: fetchOrders,
}


