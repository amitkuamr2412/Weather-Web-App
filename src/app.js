const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const directorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partPath = path.join(__dirname,'../template/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partPath)

app.use(express.static(directorypath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App' ,
        name: 'Amit' 
    })
})
app.get('/about', (req,res) => {
  //  res.send('Your weather') for static pages in public
  res.render('about',{
      title: 'About me' ,
      name: 'Amit'
  })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help' ,
        name: 'Amit'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'provide valid address !'
        })   
    }
   
geocode(req.query.address, (error, {latitude,longitude,place}={} ) => {
        
        if(error){
            return res.send({error}) 
        }
        
        forecast(latitude,longitude,place,(error,weather_data) => {
            if(error){
                return res.send({error}) 
            }

            res.send({
                forecast: weather_data,
                location: place ,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('help404',{
        message: 'Help article not found' ,
        title: 'Error 404' ,
        name: 'Amit'
    })
})

app.get('*', (req,res) => {
    res.render('my404',{
        title: 'Error 404' ,
        name: 'Amit',
        message: 'Page not found!'
    })
})
app.listen(3000, () => {
    console.log('Server up on port 3000.')
})