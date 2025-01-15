const fs = require('fs')
const path = require('path')
const downloadGoogleSheets = require('./downloadGoogleSheets')
const buildLegislationData = require('./buildLegislationData')
const updateLegislatorData = require('./updateLegislatorData')

const downloadAndBuildData = async () => {
  // fetch sheets from Google
  await downloadGoogleSheets()
  // process into json tree
  const processedData = buildLegislationData()
  // fetch legislator details from openStates
  // await updateLegislatorData()

  fs.writeFileSync(
    `${__dirname}/../../src/data/legislation.json`,
    JSON.stringify(processedData, null, 2)
  )
  console.log(`wrote data to ${path.join(__dirname, '/../../src/data')}`)
}

downloadAndBuildData()
