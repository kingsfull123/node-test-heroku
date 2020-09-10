const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 4000;
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: data
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page 404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page'
    })
})

app.listen(port, () => console.log('Server is running at port' + port));