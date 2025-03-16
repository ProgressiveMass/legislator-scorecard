const fs = require('fs-extra')
const axios = require('axios')

// get some nice debugging output
// curlirize(axios)

require('dotenv').config()

const googleSheetIds = {
  2017: '15AgxGT87Qc02IqPV46Uc0u9Z_ChfAjZQaj3qS2VNF8g',
  2019: '17SfLTsqLaoBG8WE5vKHmBY_J6Iz1IFKThm_wAqsHZdg',
  2021: '1_WD66ZAMR4gQRq9f3s0ITayesaLoQcHIMZVTHkTA6Ug',
  2023: '1Uq5Fe8F2FlRW0ns2UMbjJN9CKg2nxweE2EQfPhE6gdw',
  2025: '1ZuwDsDdT2Q7ZWwi_jhXb-xoFaU3OX10RRdvBZ7SPQ1A',
}

const requestSheet = async (id, sheet) => {
  const response = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${sheet}?key=${process.env.GOOGLE_API_KEY}`
  )
  return response.data.values
}

const loadGoogleSheets = async (year) => {
  const id = googleSheetIds[year]
  const sheetTypes = [
    'Sponsored_Bills',
    'House_Bills',
    'Senate_Bills',
    'Sponsorship',
    'House_Votes',
    'Senate_Votes',
  ]
  const sheetRequests = sheetTypes.map((sheet) => requestSheet(id, sheet))

  await Promise.all(sheetRequests).then(
    ([sponsoredBills, houseBills, senateBills, sponsorship, houseVotes, senateVotes]) => {
      // there must have been a connectivity error since this always has data
      if (sponsoredBills.length === 0) return
      fs.writeFileSync(
        `${__dirname}/tmp/${year}.json`,
        JSON.stringify({
          sponsoredBills,
          houseBills,
          senateBills,
          sponsorship,
          houseVotes,
          senateVotes,
        })
      )
      console.log(`wrote ${year} csv data to disk`)
    }
  )
}

module.exports = async () => {
  let yearsToRefresh = [
    // 2017,
    2019, 2021, 2023, 2025,
  ]
  yearsToRefresh.forEach((year) => {
    fs.removeSync(`${__dirname}/tmp/${year}.json`)
  })
  await Promise.all(yearsToRefresh.map((year) => loadGoogleSheets(year)))
}
