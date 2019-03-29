const fs = require("fs")
const downloadGoogleSheets = require("./downloadGoogleSheets")
const buildLegislationData = require("./buildLegislationData")

const downloadAndBuildData = async () => {
  await downloadGoogleSheets()
  const processedData = buildLegislationData()
  fs.writeFileSync(`${__dirname}/../processedData/index.json`, JSON.stringify(processedData))
  console.log(`wrote file to ${__dirname}/processedData.json`)
}

downloadAndBuildData()
