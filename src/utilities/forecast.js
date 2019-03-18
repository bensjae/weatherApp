const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b720f6ff3101eb36792b55102e1336b8/' + latitude + ',' + longitude + '?units=si'

    request ({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to web service', undefined)
        } else if (body.error) {
            callback('Unable to get location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Current Temperature is ' + body.currently.temperature + ' degrees. Chance of rain is ' + body.currently.precipProbability + '%')
        }
    })
}

module.exports = forecast



// make http request without the npm library
// const https = require('http')
// const url = 'https://address'
// https.request(url, (response) => {
//     let data = ''
//     response.on('data', (chunk) => {
//         data = data + chunk.toString()
//     })
//     response.on('end', () => {
//         console.log(data) //data is JSON
//         const body = JSON.parse(data)
//         console.log(body)
//     })
// })
// request.end()