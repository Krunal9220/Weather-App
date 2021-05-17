const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5ccc878d81616e4ae6611b88a70acc7c&query=' + latitude +','+ longitude;

    request({ url, json: true }, (error, { body:response } = {}) => {
        if(error) {
            callback("Unable to connect to weather services!", undefined);
        } else if(response.error) {
            callback("Can't find such location!", undefined);
        } else {
            callback(undefined, response.current.weather_descriptions + '. It is currently ' + response.current.temperature + ' degrees out. It feels like ' + response.current.feelslike + ' degrees out.')
        }
    })
}
module.exports = forecast;