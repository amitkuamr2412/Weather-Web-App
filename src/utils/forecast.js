const request = require('postman-request')

const forecast = (latitude,longitude,place,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=d55a3e7a25eae7fbaa216b2650482ef5&query='+latitude+','+longitude 
    // console.log(url)
    request({url:url, json: true}, (error,response) => {
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(response.body.error){
            callback('Location unknown', undefined)
        }
        else {
            callback(undefined,{
                Summary: response.body.current.weather_descriptions ,
                Temperature : response.body.current.temperature + ' \xB0 C' ,
                Precipitation: response.body.current.precip ,
                place: place,
                location: response.body.location.name + ', ' + response.body.location.region+ ', '+response.body.location.country
            })
        }
    })

}

module.exports = forecast