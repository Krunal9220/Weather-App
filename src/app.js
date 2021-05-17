const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();


// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name: 'Krunal'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Krunal'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help_msg : 'We are happy to help you',
        title : 'Help',
        name : 'Krunal'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Krunal',
        error : 'Help article not found'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Krunal',
        error : 'Page not found'
    });
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

