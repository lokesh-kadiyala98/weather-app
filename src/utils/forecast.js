const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/d0414c839621edfdcc40dee1693824b4/' + lat + ',' + lon

    request({ url, json: true }, (error, response) => {
        if(error) 
            callback("Unable to connect to weather service!", undefined)
        else if(response.body.error)
            callback('Unable to find location', undefined)
        else
            callback(undefined, response.body.daily.data[0].summary)
    })
}

module.exports = forecast