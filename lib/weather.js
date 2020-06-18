function getWeather() {
  return {
    locations: [
      {
        name: 'Париж',
        forecastUrl: 'https://www.wunderground.com/weather/fr/paris',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather: 'Сплошная облачность ',
        temp: '12.3 C'
      },
      {
        name: 'Лион',
        forecastUrl: 'https://www.wunderground.com/weather/fr/lyon',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: 'Малооблачно',
        temp: '12.8 C'
      },
      {
        name: 'Бордо',
        forecastUrl: 'https://www.wunderground.com/weather/fr/bordeaux',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather: 'Небольшой дождь',
        temp: '12.8 C'
      }
    ]
  }
}

module.exports = { getWeather }
