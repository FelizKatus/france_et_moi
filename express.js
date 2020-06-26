const express = require('express')
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const credentials = require('./credentials.js')
const { getSlide } = require('./lib/slider')
const { getInstagram } = require('./lib/instagram')
const { getWeather } = require('./lib/weather')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080

// Handlebars

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Static resources

app.use(express.static(`${__dirname}/public`))

// URL encoding

app.use(require('body-parser').urlencoded({ extended: true }))

// Instagram, Weather

app.use((req, res, next) => {
  if (!res.locals.partials) res.locals.partials = {}
  res.locals.partials.weatherContext = getWeather()
  res.locals.partials.instagramContext = getInstagram()
  next()
})

// Cookies, Sessions

app.use(require('cookie-parser')(credentials.cookieSecret))
app.use(
  require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
  })
)

// Flash

app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

// Routing

app.get('/', (req, res) => {
  res.render('home', { slide: getSlide })
})

app.get('/aquitaine', (req, res) => {
  res.render('aquitaine')
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

app.get('/excursion-programs', (req, res) => {
  res.render('excursion-programs')
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

// The following JavaScript- and Perl-compatible regular expression
// is an implementation of the above definition
app.get('/contact', (req, res) => {
  res.render('contact')
})
const VALID_EMAIL_REGEXP = new RegExp(
  '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
)
app.post('/contact', (req, res) => {
  // const name = req.body.name || ''
  const email = req.body.email || ''

  if (!email.match(VALID_EMAIL_REGEXP)) {
    req.session.flash = {
      intro: 'Ошибка проверки!',
      message: 'Указан некорректный адрес электронной почты.'
    }
  } else {
    req.session.flash = {
      intro: 'Спасибо!',
      message: 'Ваше письмо успешно отправлено.'
    }
  }

  console.log(req.body.name)
  console.log(req.body.email)
  console.log(req.body.message)

  return res.redirect(303, '/contact')
})

app.get('/thank-you', (req, res) => {
  res.render('thank-you')
})

app.get('/legal-notice', (req, res) => {
  res.render('legal-notice')
})

// Admin

app.get('/login', (req, res) => {
  res.render('login', { layout: null })
})

// Errors

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
