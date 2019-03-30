const fs = require("fs")
const axios = require("axios")
const parse = require("csv-parse/lib/sync")
const stringify = require("csv-stringify/lib/sync")
require("dotenv").config()

const fileName = "2017_Progressive_Mass_Data - House_Votes.csv"
const isHouse = true
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

const makeQuery = names => `
query getLegislatorIds($organization: String ) {
    ${names.map((name, index) => {
      return `
        _${index} : people(name: "${getNormalizedLastName(
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
  console.log(query)
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
  const fileContents = fs.readFileSync(`${__dirname}/../${fileName}`, "utf8")

  const csvContents = parse(fileContents)
  const rowsThatNeedIds = []
  for (let i = 0; i < csvContents.length; i++) {
    if (csvContents[i][0]) rowsThatNeedIds.push(csvContents[i])
  }

  const data = await makeRequest({
    organization: isHouse ? houseId : senateId,
    names: rowsThatNeedIds.map(row => row[0])
  })

  rowsThatNeedIds.forEach((row, index) => {
    const result = data.data.data[`_${index}`].edges
    if (result.length === 1) {
      row.splice(0, 0, result[0].node.id)
    } else if (result.length > 1) {
      console.log(row[0], result, " matched more than one")
      row.splice(0, 0, "NOT FOUND")
    } else if (!result.length) {
      console.log(row[0], " had no matches")
      row.splice(0, 0, "NOT FOUND")
    }
    try {
    } catch (e) {
      console.log(row[0])
    }
  })

  fs.writeFileSync(`${fileName}-with-id.csv`, stringify(csvContents))
}

processData(fileName)
