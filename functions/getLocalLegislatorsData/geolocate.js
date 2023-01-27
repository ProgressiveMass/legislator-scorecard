// const functions = require('firebase-functions')
const axios = require('axios')

export async function geolocate(address) {
  return axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.GOOGLE_API_KEY,
      },
    })
    .then(function (response) {
      if (response.data.results.length) {
        return response.data.results[0].geometry.location
      } else {
        // couldn't geolocate the address
        throw new Error(
          JSON.stringify({
            name: "Couldn't locate that Massachusetts address.",
            data: response.data,
          })
        )
      }
    })
}

// module.exports = geolocate
