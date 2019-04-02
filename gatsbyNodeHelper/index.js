const fs = require('fs')
const legislationData = require('../src/data/legislation.json')
const houseLegislators = require('../src/data/house_legislators.json')
const senateLegislators = require('../src/data/senate_legislators.json')
const buildVoteCumulativeData = require('./buildVoteCumulativeData')
const buildSponsorshipCumulativeData = require('./buildSponsorshipCumulativeData')

const voteSummaryYear = 2017
const sponsorshipSummaryYear = 2019

const legislatorData = {
  senate: senateLegislators,
  house: houseLegislators,
}

// helpers
const getLegislatorVotesEntry = ({ year, chamber, legislatorId }) =>
  legislationData[year][`${chamber}Votes`].find(
    entry => entry.id === legislatorId
  )

const getLegislatorSponsorshipEntry = ({ year, legislatorId }) =>
  legislationData[year].sponsorship.find(entry => entry.id === legislatorId)

// main function
const createPageDataStruct = ({ chamber, legislatorId }) => {
  const legislator = legislatorData[chamber][legislatorId]
  const pageData = {
    legislator,
  }

  pageData.data = Object.keys(legislationData).map(year => {
    const termData = {
      term: `${year}-${parseInt(year) + 1}`,
    }
    //sponsorship
    const progMassSponsoredBills = legislationData[year].sponsoredBills
    try {
      const legislatorSponsorshipEntry = getLegislatorSponsorshipEntry({
        year,
        legislatorId,
      })
      const legislatorSponsorship = legislatorSponsorshipEntry.data

      termData.sponsorship = Object.keys(legislatorSponsorship).map(billNum => {
        const billKey =
          chamber === 'senate' ? billNum.split('/')[1] : billNum.split('/')[0]
        const billData = progMassSponsoredBills[billKey]
        if (!billData) {
          throw new Error(
            `no bill data for ${billNum} found! (this means something is really wrong)`
          )
        }
        termData.sponsorship = {
          ...billData,
          yourLegislator: legislatorSponsorship[billNum],
        }
      })
    } catch (e) {
      console.error(e.message)
    }

    // votes
    if (legislationData[year][`${chamber}Votes`]) {
      try {
        // we merge them bc sometimes the house votes on a senate bill and vice versa
        const bills = {
          ...legislationData[year].senateVotes,
          ...legislationData[year].houseVotes,
        }

        const legislatorVotesEntry = getLegislatorVotesEntry({
          year,
          chamber,
          legislatorId,
        })
        const legislatorVotes = legislatorVotesEntry.data

        termData.votes = Object.keys(legislatorVotes).map(bill => {
          return {
            ...bills[bill],
            yourLegislator: legislatorVotes[bill],
          }
        })
      } catch (e) {
        console.error(e)
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
    cumulative: buildVoteCumulativeData(voteSummaryYear, legislatorData),
  }

  const sponsorship = getLegislatorSponsorshipEntry({
    year: sponsorshipSummaryYear,
    chamber,
    legislatorId,
  })
  const sponsorshipSummary = {
    cumulative: buildSponsorshipCumulativeData(sponsorshipSummaryYear),
  }

  pageData.rating = {
    votes: voteSummary,
    sponsorship: sponsorshipSummary,
  }

  return pageData
}

module.exports = createPageDataStruct
