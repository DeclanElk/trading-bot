const axios = require('axios')
const { DateTime }  = require('luxon')
require('dotenv').config()

async function fetchNineDay() {
    const url = `${process.env.ALPHA_API_DOMAIN}/query?function=SMA&symbol=${process.env.SYMBOL}${process.env.CURRENCY}&interval=daily&time_period=12&series_type=close&apikey=${process.env.ALPHA_API_KEY}`

    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            resolve(Number(response.data['Technical Analysis: SMA'][DateTime.now().minus({hours: 10}).toFormat('yyyy-MM-dd')].SMA))
        })
        .catch(error => {
            reject(error)
        })
    })
}

async function fetchThreeDay() {
    const url = `${process.env.ALPHA_API_DOMAIN}/query?function=SMA&symbol=${process.env.SYMBOL}${process.env.CURRENCY}&interval=daily&time_period=4&series_type=close&apikey=${process.env.ALPHA_API_KEY}`

    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            resolve(Number(response.data['Technical Analysis: SMA'][DateTime.now().minus({hours: 10}).toFormat('yyyy-MM-dd')].SMA))
        })
        .catch(error => {
            reject(error)
        })
    })
}

async function fetchCurrentPrice() {
    const url = `${process.env.COINSPOT_API_DOMAIN}/latest/ETH`

    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            resolve(response.data.prices)
        })
        .catch(error => {
            reject(error)
        })
    })
}

module.exports = {
    fetchNineDay: fetchNineDay,
    fetchThreeDay: fetchThreeDay,
    fetchCurrentPrice: fetchCurrentPrice,
}


