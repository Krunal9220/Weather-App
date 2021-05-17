const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5ccc878d81616e4ae6611b88a70acc7c&query=' + latitude +','+ longitude;

    request({ url, json: true }, (error, { body:response } = {}) => {
        if(error) {
            callback("Unable to connect to weather services!", undefined);
        } else if(response.error) {
            callback("Can't find such location!", undefined);
        } else {
            callback(undefined, response.current.weather_descriptions + '. <br>It is currently <b>' + response.current.temperature + '</b> degrees out. It feels like <b>' + response.current.feelslike + '</b> degrees out. <br>Wind speed is <b>' + response.current.wind_speed + '</b> Kmh at an angle of ' + response.current.wind_degree + ' degrees in the <b>' + response.current.wind_dir + '</b> direction.')
        }
    })
}
module.exports = forecast;