const legislationData = require('../src/data/legislation.json')

const median = arr => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)]
const round = num => parseFloat(num.toFixed(2))

const buildChamberVoteData = (year, legislatorData) => chamber => {
  const isDemocrat = data => data.party === 'Democratic'

  const votes = legislationData[year][`${chamber}Votes`]
    .map(data => {
      const legislatorDescription = legislatorData[chamber].find(
        legislator => legislator && legislator.id === data.id
      )
      return legislatorDescription
        ? { ...data, party: legislatorDescription.party }
        : undefined
    })
    .filter(Boolean)

  const allDemocratVotes = votes
    .filter(vote => vote.recordedVotePercentage > 90)
    .filter(vote => {
      return isDemocrat(vote)
    })
    .map(vote => vote.score)

  const democratMedian = round(median(allDemocratVotes))
  const republicanVotes = votes
    .filter(vote => vote.recordedVotePercentage > 90)
    .filter(vote => {
      return !isDemocrat(vote)
    })
    .map(vote => vote.score)

  const republicanMedian = round(median(republicanVotes))
  return {
    term: `${year}-${parseInt(year) + 1}`,
    median: {
      democrat: democratMedian,
      republican: republicanMedian,
    },
  }
}

const buildVoteCumulativeData = (year, legislatorData) => {
  return {
    house: buildChamberVoteData(year, legislatorData)('house'),
    senate: buildChamberVoteData(year, legislatorData)('senate'),
  }
}
module.exports = buildVoteCumulativeData
