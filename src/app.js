const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup hadlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Lokesh Kadiyala'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lokesh Kadiyala'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Go to Weather tab and search for any location to get forecast info.',
        title: 'Help',
        name: 'Lokesh Kadiyala'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({ error })
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({ error })

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        mssg: 'Help article not found.',
        name: 'Lokesh Kadiyala'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        mssg: 'Page not found.',
        name: 'Lokesh Kadiyala'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})