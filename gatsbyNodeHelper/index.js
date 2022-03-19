const legislationData = require('../src/data/legislation.json')
const houseLegislators = require('../src/data/house_legislators.json')
const senateLegislators = require('../src/data/senate_legislators.json')
const buildVoteCumulativeData = require('./buildVoteCumulativeData')
const buildSponsorshipCumulativeData = require('./buildSponsorshipCumulativeData')

const voteSummaryYear = 2021
const sponsorshipSummaryYear = 2021

const legislatorData = {
  senate: senateLegislators,
  house: houseLegislators,
}

const medianVoteData = buildVoteCumulativeData(voteSummaryYear, legislatorData)

const medianSponsorshipData = buildSponsorshipCumulativeData(
  sponsorshipSummaryYear,
  legislatorData
)

// helpers
const getLegislatorVotesEntry = ({ year, chamber, legislatorId }) =>
  legislationData[year][`${chamber}Votes`].find(
    entry => entry && entry.id === legislatorId
  )

const getLegislatorSponsorshipEntry = ({ year, legislatorId }) =>
  legislationData[year].sponsorship.find(entry => entry.id === legislatorId)

// main function
const createPageDataStruct = ({ chamber, legislatorId }) => {
  const legislator = legislatorData[chamber].find(
    data => data && data.id === legislatorId
  )
  const pageData = {
    legislator,
  }

  pageData.data = Object.keys(legislationData).map(year => {
    const termData = {
      term: `${year}-${parseInt(year) + 1}`,
    }
    //sponsorship
    const progMassSponsoredBills = legislationData[year].sponsoredBills
    const legislatorSponsorshipEntry = getLegislatorSponsorshipEntry({
      year,
      legislatorId,
    })
    if (legislatorSponsorshipEntry === undefined) {
      termData.sponsorship = []
      console.warn(
        `${pageData.legislator.name} didn't have sponsorship data available for ${year}`
      )
    } else {
      const legislatorSponsorship = legislatorSponsorshipEntry.data

      termData.sponsorship = Object.keys(legislatorSponsorship).map(billNum => {
        const billKey = !billNum.match('/')
          ? billNum
          : chamber === 'senate'
          ? billNum.match(/S\d+/)[0]
          : billNum.match(/H\d+/)[0]
        const billData = progMassSponsoredBills[billKey]
        if (!billData) {
          throw new Error(
            `no bill data for ${billNum} found! (this means something is really wrong)`
          )
        }
        return {
          ...billData,
          yourLegislator: legislatorSponsorship[billNum],
        }
      })
    }

    // votes
    if (legislationData[year][`${chamber}Votes`]) {
      const legislatorVotesEntry = getLegislatorVotesEntry({
        year,
        chamber,
        legislatorId,
      })
      if (legislatorVotesEntry === undefined) {
        termData.votes = []
        console.warn(
          `${pageData.legislator.name} didn't have vote data available for ${year}`
        )
      } else {
        const legislatorVotes = legislatorVotesEntry.data

        termData.votes = Object.keys(legislatorVotes).map(rollCallNumber => {
          return {
            ...legislationData[year][`${chamber}Bills`][rollCallNumber],
            yourLegislator: legislatorVotes[rollCallNumber],
          }
        })
        termData.score = legislatorVotesEntry.score
        termData.recordedVotePercentage =
          legislatorVotesEntry.recordedVotePercentage
      }
    }
    return termData
  })

  const votes = getLegislatorVotesEntry({
    year: voteSummaryYear,
    chamber,
    legislatorId,
  })

  const voteSummary = {
    cumulative: medianVoteData[chamber],
    recordedVotePercentage: votes && votes.recordedVotePercentage,
    score: votes && votes.score,
  }

  const sponsorship = getLegislatorSponsorshipEntry({
    year: sponsorshipSummaryYear,
    chamber,
    legislatorId,
  })
  const sponsorshipSummary = {
    cumulative: medianSponsorshipData,
    legislator: sponsorship && sponsorship.score,
    total: sponsorship && Object.keys(sponsorship.data).length,
  }

  pageData.rating = {
    votes: voteSummary,
    sponsorship: sponsorshipSummary,
  }
  return pageData
}

module.exports = createPageDataStruct
