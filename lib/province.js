// Provinces

// const provinces = [
//     'Aquitaine',
//     'Bretagne',
//     'Normandie'
// ]

const provinces = [
  '<img src="/images/paris.jpg" class="w-full" alt="Paris">',
  '<img src="/images/normandy.jpg" class="w-full" alt="Normandy">'
]

exports.getProvince = () => {
  const idx = provinces[Math.floor(Math.random() * provinces.length)]
  return idx
}