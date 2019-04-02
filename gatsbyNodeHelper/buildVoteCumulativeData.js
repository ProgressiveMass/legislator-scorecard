const legislationData = require('../src/data/legislation.json')

const avg = arr => arr.reduce((acc, curr) => acc + curr, 0) / arr.length

const buildVoteSummaryEntry = (year, legislatorData) => chamber => {

  const isDemocrat = chamber => id =>
    legislatorData[chamber][id].party === 'Democratic'

  const allDemocractVotes = legislationData[year][`${chamber}Votes`]
    .filter(vote => vote.recordedVotePercentage > 50)
    .filter(vote => {
      return isDemocrat('house')(vote.id)
    })
    .map(vote => vote.score)
  const democratAvg = avg(allDemocractVotes)
  const republicanVotes = legislationData[year][`${chamber}Votes`]
    .filter(vote => vote.recordedVotePercentage > 50)
    .filter(vote => {
      return !isDemocrat('house')(vote.id)
    })
    .map(vote => vote.score)
  const republicanAvg = avg(republicanVotes)
  return {
    democratAvg,
    republicanAvg,
  }
}

const buildVoteSummaryData = (year, legislatorData) => {
  return {
    [year]: {
      house: buildVoteSummaryEntry(year, legislatorData)('house'),
      senate: buildVoteSummaryEntry(year, legislatorData)('senate'),
    },
  }
}
module.exports = buildVoteSummaryData
