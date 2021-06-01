const request = require('postman-request')

const rev_geocode = (latitude, longitude, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude +','+ latitude + '.json?access_token=pk.eyJ1Ijoia3J1bmFsOTIyMCIsImEiOiJja285bTFyZzYyajYyMnFuc2M0eHE2ajhtIn0.XE-VK6JcnsDALMs1y12vWw&limit=1'

    request({url, json: true}, (error, { body : response} = {}) => {
        if(error) {
            callback("Unable to connect to Geo services!", undefined);
        } else if(response.features.length == 0) {
            callback("Can't find such place!", undefined);
        } else {
            callback(undefined, {
                location: response.features[0].place_name
            });
        }
    })
}
module.exports = rev_geocode;