const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=933989b3c3a0b1fb30c5dcac0427eb78&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('error', undefined);
        } else {
            callback(undefined, 'The tempreture is ' + body.current.temperature + ' degrees and it feels like ' + body.current.feelslike + ' degress.')
        }
    })
}

module.exports = forecast;

// forecast(-71.0596, 42.3605, (error, response) => {
//     console.log(error);
//     console.log('The tempreture is ' + response.body.current.temperature + ' degrees and it feels like ' + response.body.current.feelslike + ' degress.')
// })