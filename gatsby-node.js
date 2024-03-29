/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { createOpenGraphImage } = require('gatsby-plugin-open-graph-images')

const createPageDataStruct = require('./gatsbyNodeHelper/index')
const houseLegislators = require('./src/data/house_legislators.json')
const senateLegislators = require('./src/data/senate_legislators.json')
const legislationData = require('./src/data/legislation.json')

const { getLegislatorUrlParams, isHouseRep, isSenator } = require('./src/utilities')

const makePage = ({ chamber, pageData, createPage, legislatorId }) => {
  const ogImageFilename = (
    getLegislatorUrlParams(pageData.legislator) +
    '-' +
    pageData.legislator.district
  )
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[.,']/g, '')
    // The next two lines remove diacritics, which createOpenGraphImage can't handle
    // Source: stackoverflow.com/questions/990904
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const context = {
    id: legislatorId,
    chamber,
    pageData,
    ogImage: createOpenGraphImage(createPage, {
      path: `og-images/legislator/${ogImageFilename}.png`,
      component: path.resolve(`src/components/legislator/ogImage.js`),
      waitCondition: 'networkidle0',
      size: {
        width: 630,
        height: 315,
      },
      context: {
        chamber,
        pageData,
      },
    }),
  }
  createPage({
    path: `/legislator/${getLegislatorUrlParams(pageData.legislator)}`,
    component: require.resolve(`./src/components/legislator/index.js`),
    context,
  })
}

// create individual legislator pages
exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions

  //TODO - other sessions
  let sessionYear = 2023
  let sessionVotesYear = 2021
  // sponsorships
  const getLegislatorById = (id) => {
    let legislator =
      houseLegislators.find((legislator) => legislator.id === id) ??
      senateLegislators?.find((legislator) => legislator.id === id)
    if (legislator === undefined) {
      throw new Error(
        `A legislator with ID ${id} is included in the sponsorships table, but that ID was not found among the ` +
        `current legislators provided by Open States. Possibly a typo in the ID, or a retired legislator.`
      )
    }
    let votes =
      legislationData[sessionVotesYear]?.houseVotes?.find((vote) => vote.id === id) ??
      legislationData[sessionVotesYear]?.senateVotes?.find((vote) => vote.id === id)
    return {
      ...legislator,
      ...votes,
    }
  }

  let sponsoredBills = Object.entries(legislationData[sessionYear].sponsoredBills)

  const allSponsoredBillsTemplate = path.resolve(`./src/components/sponsorships/index.js`)

  createPage({
    path: `/sponsorships/all-bills`,
    component: allSponsoredBillsTemplate,
    context: {
      sponsoredBills,
    },
  })

  const sponsoredBillTemplate = path.resolve(`./src/components/sponsorships/sponsorships.js`)

  let sponsors = legislationData[sessionYear].sponsorship.map((sponsorshipData) => {
    let legislatorData = getLegislatorById(sponsorshipData.id)
    return {
      sponsorshipData: { ...sponsorshipData.data, ...sponsorshipData.score },
      ...legislatorData,
    }
  })

  sponsoredBills.forEach((sponsoredBill) => {
    let sortedSponsors = []
    const [billNumber, billData] = sponsoredBill
    let otherBillNames = ''
    sortedSponsors = sponsors
      .filter((sponsor) => {
        if (!sponsor.id) return false
        for (const bills in sponsor.sponsorshipData) {
          if (bills.includes(billNumber) && sponsor.sponsorshipData[bills]) {
            otherBillNames = bills
            return true
          }
        }
        return false
      })
      .map((sponsor) => {
        return {
          ...sponsor,
          name: [sponsor.familyName, sponsor.givenName].join(', '),
        }
      })

    createPage({
      path: `/sponsorships/${billNumber}`,
      component: sponsoredBillTemplate,
      context: {
        billData: { ...billData, otherBillNames },
        sponsors: sortedSponsors,
        houseSponsors: sortedSponsors.filter(isHouseRep),
        senateSponsors: sortedSponsors.filter(isSenator),
      },
    })
  })

  let legislatorsList = [
    { chamber: 'senate', legislators: senateLegislators },
    { chamber: 'house', legislators: houseLegislators },
  ].map(({ chamber, legislators }) => {
    legislators.forEach(({ id: legislatorId }) => {
      const pageData = createPageDataStruct({
        chamber,
        legislatorId,
      })
      makePage({ chamber, pageData, createPage, legislatorId })
    })
  })
}
