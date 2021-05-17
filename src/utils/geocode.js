const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3J1bmFsOTIyMCIsImEiOiJja285bTFyZzYyajYyMnFuc2M0eHE2ajhtIn0.XE-VK6JcnsDALMs1y12vWw'

    request({url, json: true}, (error, { body : response} = {}) => {
        if(error) {
            callback("Unable to connect to Geo services!", undefined);
        } else if(response.features.length == 0) {
            callback("Can't find such place!", undefined);
        } else {
            callback(undefined, {
                longitude: response.features[0].center[0],
                latitude: response.features[0].center[1],
                location: response.features[0].place_name
            });
        }
    })
}
module.exports = geocode;