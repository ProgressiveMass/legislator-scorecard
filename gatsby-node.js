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
  // sponsorships
  const getLegislatorById = (id) => {
    return (
      houseLegislators.find((legislator) => legislator.id === id) ??
      senateLegislators?.find((legislator) => legislator.id === id)
    )
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

  let sponsors = Object.entries(legislationData[sessionYear].sponsorship).map((sponsorshipItem) => {
    const [id, sponsorshipData] = sponsorshipItem
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
          return false
        }
      })
      .sort((a, b) => {
        const sponsorA = a.familyName?.toLowerCase()
        const sponsorB = b.familyName?.toLowerCase()
        if (sponsorA < sponsorB) {
          return -1
        }
        if (sponsorA > sponsorB) {
          return 1
        }
        return 0
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
