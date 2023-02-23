const axios = require('axios')
const functions = require('firebase-functions')

const query = `
query getLocalLegislators($latitude: Float, $longitude: Float) {
  senator: people(latitude: $latitude, longitude: $longitude, memberOf: "ocd-organization/1a75ab3a-669b-43fe-ac8d-31a2d6923d9a", first: 1) {
    edges {
      node {
        id
        name
      }
    }
  }
  representative: people(latitude: $latitude, longitude: $longitude, memberOf: "ocd-organization/ca38ad9c-c3d5-4c4f-bc2f-d885218ed802", first: 1) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`

function findLocalLegislators(coordinates) {
  return axios
    .post(
      'https://openstates.org/graphql',
      {
        query,
        variables: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
      },
      {
        headers: {
          'X-API-KEY': functions.config().keys.openstates_api_key,
        },
      }
    )
    .then(function (response) {
      if (!Object.keys(response.data).length) {
        throw new Error("The Open States API couldn't find your legislators.")
      }
      return {
        senator: response.data.data.senator.edges[0].node.id,
        representative: response.data.data.representative.edges[0].node.id,
      }
    })
    .catch(function (error) {
      console.error(error)
    })
}

module.exports = findLocalLegislators
