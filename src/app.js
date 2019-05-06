const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utilities/forecast')
const geoservice = require('./utilities/geoservice')

const app = express()
const port = process.env.PORT || 3000

//Paths for express configurations
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and location of views
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    //from views folder
    res.render('index', {
        title: 'Simple Weather App',
        author: 'Ben'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Ben'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Ben'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    geoservice(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(longitude, latitude, (error, weatherData) => {
            if (error) {
                return res.send({error: error})
            }
            res.send({
                forecast: weatherData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search is empty'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page 404',
        author: 'Ben',
        errorMsg: 'Help ext not found'
    })
})

//* match anything that has not been covered
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        author: 'Ben',
        errorMsg: 'Page not found'
    })
})

//port eg 3000
//second argument optional
app.listen(port, () => {
    console.log('Server running on port ' + port)
})