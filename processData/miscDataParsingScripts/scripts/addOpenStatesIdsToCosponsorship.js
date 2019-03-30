const fs = require("fs")
const axios = require("axios")
const parse = require("csv-parse/lib/sync")
const stringify = require("csv-stringify/lib/sync")
require("dotenv").config()

const fileName = "2017_Progressive_Mass_Data - Sponsorship.csv"
const houseId = "ocd-organization/ca38ad9c-c3d5-4c4f-bc2f-d885218ed802"
const senateId = "ocd-organization/1a75ab3a-669b-43fe-ac8d-31a2d6923d9a"

function normalizeName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[.-]/g, "")
}

function getNormalizedLastName(name) {
  return normalizeName(name.split(",")[0])
}

function createNameKey(name) {
  return normalizeName(name).replace(/[\s,'"]/g, "")
}
const makeQuery = names => `
query getLegislatorIds($organization: String ) {
    ${names.map((name, index) => {
      const key = createNameKey(name)
      if (!key) return ""
      return `
        ${key} : people(name: "${getNormalizedLastName(
        name
      )}", everMemberOf: $organization, first: 1) {
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
  return axios.post(
    "https://openstates.org/graphql",
    {
      query: query,
      variables: {
        organization
      }
    },
    {
      headers: {
        "X-API-KEY": process.env.OPENSTATES_API_KEY
      }
    }
  )
}

const processData = async fileName => {
  const fileContents = fs.readFileSync(`${__dirname}/${fileName}`, "utf8")

  const csvContents = parse(fileContents)
  const newRow = [...new Array(csvContents[0].length)].map(n => "")

  let senateData = await makeRequest({
    organization: senateId,
    names: csvContents[0].slice(5).filter(Boolean)
  })
  senateData = senateData.data.data

  let houseData = await makeRequest({
    organization: houseId,
    names: csvContents[0].slice(5)
  })

  houseData = houseData.data.data

  const data = Object.keys(senateData).forEach((key, i) => {
    if (senateData[key].edges.length === 0) {
      senateData[key] = houseData[key]
    }
  })

  const allData = senateData

  const newRowWithIds = newRow.map((_, index) => {
    if (index <= 4) return ""
    const name = csvContents[0][index]
    const personData = allData[createNameKey(name)]
    if (!personData) return ""
    try {
      const result = personData.edges
      if (result.length === 1) {
        console.log(
          `matching ${result[0].node.name} with ${csvContents[0][index]}`
        )
        return result[0].node.id
      } else if (result.length > 1) {
        console.log(csvContents[0][index], result, " matched more than one")
        return "NOT FOUND"
      } else if (!result.length) {
        console.log(csvContents[0][index], " had no matches")
        return "NOT FOUND"
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
