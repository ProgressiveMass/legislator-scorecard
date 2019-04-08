const geolocate = require('./geolocate')
const findLocalLegislators = require('./findLocalLegislators')

module.exports = function(address) {
  return geolocate(address).then(findLocalLegislators)
}
