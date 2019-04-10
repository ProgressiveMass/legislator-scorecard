const fs = require('fs')
const axios = require('axios')
const parse = require('csv-parse/lib/sync')
const stringify = require('csv-stringify/lib/sync')
const normalize = require('normalize-strings')
const stringSimilarity = require('string-similarity')
require('dotenv').config()

// change this
const fileName = `2019_Progressive_Mass_Data - Sponsorship.csv`

const houseId = 'ocd-organization/ca38ad9c-c3d5-4c4f-bc2f-d885218ed802'
const senateId = 'ocd-organization/1a75ab3a-669b-43fe-ac8d-31a2d6923d9a'

function normalizeName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[.-]/g, '')
}

function getNormalizedLastName(name) {
  return normalizeName(name.split(',')[0])
}

function createNameKey(name) {
  return normalizeName(normalize(name)).replace(/[\s,'"]/g, '')
}
const makeQuery = names => `
query getLegislatorIds($organization: String ) {
    ${names.map((name, index) => {
      const key = createNameKey(name)
      if (!key) return ''
      return `
        ${key} : people(name: "${getNormalizedLastName(
        name
      )}", memberOf: $organization, first: 10) {
          edges {
            node {
              id
              name
            }
          }
        }
        `
    })}
  }
`

const makeRequest = ({ organization, names }) => {
  const query = makeQuery(names)
  fs.writeFileSync(`${__dirname}/query.txt`, query)
  return axios.post(
    'https://openstates.org/graphql',
    {
      query: query,
      variables: {
        organization,
      },
    },
    {
      headers: {
        'X-API-KEY': process.env.OPENSTATES_API_KEY,
      },
    }
  )
}

const processData = async fileName => {
  const fileContents = fs.readFileSync(`${__dirname}/../${fileName}`, 'utf8')

  const csvContents = parse(fileContents)
  const nameRow = csvContents[0]

  const newRow = [...new Array(nameRow.length)].map(n => '')

  let senateData = await makeRequest({
    organization: senateId,
    names: nameRow.slice(3).filter(Boolean),
  })
  senateData = senateData.data.data

  let houseData = await makeRequest({
    organization: houseId,
    names: nameRow.slice(3),
  })

  houseData = houseData.data.data

  Object.keys(senateData).forEach((key, i) => {
    if (senateData[key].edges.length === 0) {
      senateData[key] = houseData[key]
    }
  })

  const allData = senateData

  const newRowWithIds = newRow.map((_, index) => {
    if (index <= 2) return ''
    const name = nameRow[index].trim()
    const personData = allData[createNameKey(name)]
    if (!personData) return ''
    try {
      const result = personData.edges
      if (result.length === 1) {
        console.log(`matching ${result[0].node.name} with ${nameRow[index]}`)
        return result[0].node.id
      } else if (result.length > 1) {
        const bestMatch = stringSimilarity.findBestMatch(
          name,
          result.map(({ node: { name } }) => name)
        ).bestMatch
        if (bestMatch.rating > 0.6) {
          // console.log(
          //   `Via string similarity metrics, the best match for ${name} was: ${
          //     bestMatch.target
          //   }`
          // )
          return result.find(({ node: { name } }) => name === bestMatch.target)
            .node.id
        } else {
          return 'NOT FOUND'
        }
      } else if (!result.length) {
        console.log(nameRow[index], 'had no matches')
        return 'NOT FOUND'
      }
    } catch (e) {
      debugger // eslint-disable-line
    }
  })

  fs.writeFileSync(
    `${fileName}-with-id.csv`,
    stringify([newRowWithIds].concat(csvContents))
  )
}

processData(fileName)
