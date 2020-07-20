const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
const credentials = require('./credentials')
const { getSlide } = require('./lib/slider')
const { getInstagram } = require('./lib/instagram')
const { getWeather } = require('./lib/weather')

require('dotenv').config()

const app = express()

// Environment

const PORT = process.env.PORT || 8080

// Handlebars

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Logging

switch (app.get('env')) {
  case 'development':
    /* eslint-disable global-require */
    app.use(require('morgan')('dev'))
    /* eslint-enable global-require */
    break
  case 'production':
    // https://github.com/joehewitt/express-logger
    // app.use(require('express-logger')({ path: path.join(__dirname, '/log/requests.log') }))
    break
  default:
}

// Static

app.use(express.static(path.join(__dirname, 'public')))

// URL encoding

app.use(bodyParser.urlencoded({ extended: true }))

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

// CSURF

app.use(require('csurf')())

app.use((req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  res.locals._csrfToken = req.csrfToken()
  next()
})

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
  res.render('family-holidays-in-france')
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
// https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
app.get('/contact', (req, res) => {
  res.render('contact')
})
const VALID_EMAIL_REGEXP = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@" +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
)
app.post('/contact', (req, res) => {
  const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: credentials.gmail.user,
      pass: credentials.gmail.password
    }
  })

  const mailOptions = {
    from: 'Contact Form <do-not-reply@gmail.com>',
    to: 'felizkatus@gmail.com',
    subject: 'Contact Form Submission',
    html: `<p>You have submission the following details...</p>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Message:</strong> ${req.body.message}</p>`,
    generateTextFromHtml: true
  }

  if (req.body.human) {
    console.log('true')

    if (!req.body.email.match(VALID_EMAIL_REGEXP)) {
      req.session.flash = {
        intro: 'Ошибка проверки!',
        message: 'Указан некорректный адрес электронной почты.'
      }
      res.redirect(303, '/contact')
    }

    mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Message could not be sent: ${error}`)

        req.session.flash = {
          intro: 'Ошибка отправки!',
          message: 'Во время отправки письма произошла ошибка.'
        }
        res.redirect(303, '/contact')
      } else {
        console.log(`Message sent: ${info.response}`)

        req.session.flash = {
          intro: 'Спасибо!',
          message: 'Ваше письмо успешно отправлено.'
        }
        res.redirect(303, '/contact')
      }
    })
  } else {
    console.log('false')

    req.session.flash = {
      intro: 'Ошибка проверки!',
      message: 'Подтвердите, что Вы не робот.'
    }
    res.redirect(303, '/contact')
  }
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

app.listen(PORT, () => {
  console.log(`Server started in ${app.get('env')} mode at http://localhost:${PORT}`)
})
