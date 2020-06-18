// Slider

const slides = [
  '<img src="/images/slider/paris.jpg" class="w-full" alt="Paris">',
  '<img src="/images/slider/normandy.jpg" class="w-full" alt="Normandy">'
]

const getSlide = () => {
  return slides[Math.floor(Math.random() * slides.length)]
}

module.exports = { getSlide }
