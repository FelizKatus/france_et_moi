// Provinces

const provinces = [
    'Aquitaine',
    'Bretagne',
    'Normandie'
]

exports.getProvince = () => {
    let idx = provinces[Math.floor(Math.random() * provinces.length)]
    return idx
}