const express = require('express')
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const province = require('./lib/province')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080

// Handlevars

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Static resources

app.use(express.static(__dirname + '/public'))

// Routing

app.get('/', (req, res) => {
  res.render('home', { province: province.getProvince })
})

app.get('/aquitaine', (req, res) => {
  res.render('aquiteine')
})
app.get('/anjou-poitou-touraine', (req, res) => {
  res.render('anjou-poitou-touraine')
})
app.get('/brittany-normandy', (req, res) => {
  res.render('brittany-normandy')
})
app.get('/burgundy', (req, res) => {
  res.render('burgundy')
})
app.get('/lyon', (req, res) => {
  res.render('lyon')
})
app.get('/normandy', (req, res) => {
  res.render('normandy')
})
app.get('/paris', (req, res) => {
  res.render('paris')
})
app.get('/picardy', (req, res) => {
  res.render('picardy')
})
app.get('/heart-of-france', (req, res) => {
  res.render('heart-of-france')
})
app.get('/alsace', (req, res) => {
  res.render('alsace')
})
app.get('/champagne', (req, res) => {
  res.render('champagne')
})

app.get('/tasty-france', (req, res) => {
  res.render('tasty-france')
})
app.get('/wine-tours', (req, res) => {
  res.render('wine-tours')
})
app.get('/family-holidays-in-france', (req, res) => {
  res.render('/family-holidays-in-france')
})
app.get('/castles-of-france', (req, res) => {
  res.render('castles-of-france')
})
app.get('/france-for-children', (req, res) => {
  res.render('france-for-children')
})

app.get('/transfers', (req, res) => {
  res.render('transfers')
})
app.get('/price', (req, res) => {
  res.render('price')
})

app.get('/news', (req, res) => {
  res.render('news')
})
app.get('/obligations', (req, res) => {
  res.render('obligations')
})
app.get('/licensed-guide', (req, res) => {
  res.render('licensed-guide')
})
app.get('/reviews', (req, res) => {
  res.render('reviews')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/legal-notice', (req, res) => {
  res.render('legal-notice')
})

// Middleware

app.use((req, res) => {
  res.status(404)
  res.render('404')
})
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(PORT)
