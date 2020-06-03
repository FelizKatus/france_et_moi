const express = require('express')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080

// Handlevars

const handlebars = require('express-handlebars')
  .create({ defaultLayout:'main' })
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Static resources

app.use(express.static(__dirname + '/public'))

// Routing

const provinces = [
    'Aquitaine',
    'Bretagne',
    'Normandie'
]

app.get('/', (req, res) => {
    const randomProvince =
        provinces[Math.floor(Math.random() * provinces.length)]
    res.render('home', { province: randomProvince })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})

// Middleware

app.use((req, res) => {
    res.status(404)
    res.render('404')
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(PORT)