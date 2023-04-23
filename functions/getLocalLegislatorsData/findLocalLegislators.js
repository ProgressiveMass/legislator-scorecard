const axios = require('axios')
const path = require('path');
const https = require('https');
const rootCas = require('ssl-root-cas').inject();

rootCas.addFile(path.resolve(__dirname, 'certs/intermediate.pem'));
const httpsAgent1 = new https.Agent({ca: rootCas});

function findLocalLegislators(coordinates) {
  return axios.get('https://malegislature.gov/Legislators/GetDistrictByLatLong', {
    params: {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      isDistrictSearch: false,
    },
      httpsAgent: httpsAgent1,
  }).then(response => {
    memberCodes = {}
    response.data.districts.map(({ Branch, UserMemberCode }) => {
      if (Branch == 'Senate') {
        memberCodes.senator = UserMemberCode
      } else if (Branch == 'House') {
        memberCodes.representative = UserMemberCode
      } else {
        throw new Error(`Unexpected chamber: ${Branch}`)
      }
    })
    return memberCodes
  }).catch(function(error) {
      console.error('malegislature error:', error)
      throw error
  })
}

module.exports = findLocalLegislators
