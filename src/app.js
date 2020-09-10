const express = require('express');
const path = require('path');
const hbs = require('hbs');
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

app.listen(4000, () => console.log('Server is running at port 4000.'))