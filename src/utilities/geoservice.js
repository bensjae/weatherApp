const request = require('request')

const geoservice = (address, callback) => {
    //mapbox to get the longitude and latitude
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYmVuc2phZSIsImEiOiJjanRjZWI0cWIwdm8wM3pvYTNia2Vtd29tIn0.sHGgr3a7L4rlWIHpEdG06g'
    
    //json:true to parse the data
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geoservice')
        } else if (body.features.length === 0) {
            callback('Unable to get matching place. Try another city', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })  
}

module.exports = geoservice