const legislationData = require('../src/data/legislation.json')

const median = arr => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)]
const round = num => parseFloat(num.toFixed(2))

const buildSponsorshipCumulativeData = (year, legislatorData) => {
  const allLegislatorData = [
    ...legislatorData['senate'],
    ...legislatorData['house'],
  ]

  const isDemocrat = data => data.party === 'Democratic'

  const sponsorship = legislationData[year].sponsorship
    .map(data => {
      const legislatorDescription = allLegislatorData.find(
        legislator => legislator.id === data.id
      )
      return legislatorDescription
        ? { ...data, party: legislatorDescription.party }
        : undefined
    })
    .filter(Boolean)
  const democratMedian = round(
    median(sponsorship.filter(data => isDemocrat(data)).map(data => data.score))
  )
  // ok technically "non democrat"
  const republicanMedian = round(
    median(
      sponsorship.filter(data => !isDemocrat(data)).map(data => data.score)
    )
  )

  return {
    term: `${year}-${parseInt(year) + 1}`,
    median: {
      democrat: democratMedian,
      republican: republicanMedian,
    },
  }
}

module.exports = buildSponsorshipCumulativeData
