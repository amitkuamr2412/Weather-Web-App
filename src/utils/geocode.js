const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdGt1YW1yIiwiYSI6ImNreGphenU1eDFscmQycG5wMmZnOHk0cGsifQ.o5SiVNDnIoMkAHaULWDzJQ' 
//    console.log(url)
    request({url:url, json: true}, (error,response) => {
        if(error){
            callback('Unable to connect',undefined)
        } else if( response.body.features.length === 0){
            callback('Unable to find location',undefined) 
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1] ,
                longitude: response.body.features[0].center[0] ,
                place: response.body.features[0].place_name
            } )
        }
    })
}

module.exports = geocode 