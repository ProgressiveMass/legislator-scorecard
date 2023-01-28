const fs = require('fs')
const axios = require('axios')
require('dotenv').config()

const query = `
query getLegislatorInfo($organization: String, $cursor: String) {
  people(memberOf: $organization, first: 100, after: $cursor) {
    edges {
      node {
        id
        name
        givenName
        familyName
        image
        sources {
          url
        }
        contactDetails {
          value
          note
          type
        }
        party: currentMemberships(classification: "party") {
          organization {
            name
          }
        }
        districtUpper: currentMemberships(classification: "upper") {
          post {
            label
          }
        }
        districtLower: currentMemberships(classification: "lower") {
          post {
            label
          }
        }
        image
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    totalCount
  }
}
`

const houseId = 'ocd-organization/ca38ad9c-c3d5-4c4f-bc2f-d885218ed802'
const senateId = 'ocd-organization/1a75ab3a-669b-43fe-ac8d-31a2d6923d9a'

const makeRequest = ({ organization, cursor }) => {
  return axios.post(
    'https://openstates.org/graphql',
    {
      query,
      variables: {
        organization,
        cursor,
      },
    },
    {
      headers: {
        'X-API-KEY': process.env.GATSBY_OPENSTATES_API_KEY,
      },
    }
  )
}

const processData = (edges) => {
  return edges
    .map(({ node }) => node)
    .map((data) => {
      try {
        data.district = data.districtUpper.length
          ? data.districtUpper[0].post.label
          : data.districtLower[0].post.label
        delete data.districtUpper
        delete data.districtLower
        data.email = data.contactDetails.filter(
          (c) => c.type === 'email'
        )[0].value
        try {
          data.phone = data.contactDetails.filter(
            (c) => c.type === 'voice'
          )[0].value
        } catch (e) {
          console.warn('No phone number for ' + data.name)
          data.phone = ''
        }
        data.url = data.sources[0].url
        data.party = data.party[0].organization.name
        delete data.sources
        delete data.contactDetails
        if (!data.givenName) {
          data.givenName = data.name.split(/\s/)[0]
          console.warn(
            `${data.name} missing givenName, using ${data.givenName}`
          )
        }
        if (!data.familyName) {
          data.familyName = getFamilyName(data.name)
          console.warn(
            `${data.name} missing familyName, using ${data.familyName}`
          )
        }
        return data
      } catch (e) {
        console.error(
          'Failed to process data for ' + data.name + ' (' + data.id + ')'
        )
        console.error(data)
        throw e
      }
    })
}

const makePaginatedRequest = ({ organization, cursor, data }) => {
  return makeRequest({ organization, cursor }).then(
    ({
      data: {
        data: {
          people: { edges, pageInfo },
        },
      },
    }) => {
      ;[].push.apply(data, processData(edges))
      if (pageInfo.hasNextPage) {
        return makePaginatedRequest({
          organization,
          cursor: pageInfo.endCursor,
          data,
        })
      } else {
        return data
      }
    }
  )
}

const requestAllData = (organization) => {
  const data = []
  return makePaginatedRequest({
    organization,
    cursor: null,
    data,
  })
}

const getFamilyName = (name) => {
  const splitName = name.split(/\s/)
  // last name if there's a final thing like "jr" or "the third"
  const possibleLast = splitName.find((item) => item.match(/,$/))
  const familyName = possibleLast
    ? possibleLast.replace(',', '')
    : splitName.slice(-1)[0]
  return familyName
}

module.exports = () => {
  Promise.all([requestAllData(houseId), requestAllData(senateId)]).then(
    ([houseData, senateData]) => {
      fs.writeFileSync(
        `${__dirname}/../../src/data/house_legislators.json`,
        JSON.stringify(houseData.filter(Boolean))
      )
      fs.writeFileSync(
        `${__dirname}/../../src/data/senate_legislators.json`,
        JSON.stringify(senateData.filter(Boolean))
      )
    }
  )
}
