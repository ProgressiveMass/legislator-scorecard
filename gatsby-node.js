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

//TODO - other sessions
const sponsorshipsSessionNumber = 194
const votesSessionOrdinal = '193rd'
const sponsorshipsSessionYear = 2025
const votesSessionYear = 2023

// create individual legislator pages
exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions

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
      legislationData[votesSessionYear]?.houseVotes?.find((vote) => vote.id === id) ??
      legislationData[votesSessionYear]?.senateVotes?.find((vote) => vote.id === id)
    return {
      ...legislator,
      ...votes,
    }
  }

  let sponsoredBills = Object.entries(legislationData[sponsorshipsSessionYear].sponsoredBills)

  const sponsoredBillTemplate = path.resolve(`./src/components/sponsorships/sponsorships.js`)

  let sponsors = legislationData[sponsorshipsSessionYear].sponsorship.map((sponsorshipData) => {
    let legislatorData = getLegislatorById(sponsorshipData.id)
    return {
      sponsorshipData: { ...sponsorshipData.data, ...sponsorshipData.score },
      ...legislatorData,
    }
  })

  const validateBillStatuses = (billData) => {
    const validStatusPairs = [
      ['Passed', 'Passed'],
      ['Not Yet', 'Not Yet'],
      ['Passed', 'Not Yet'],
      ['Not Yet', 'Passed'],
      ['In Conference Committee', 'In Conference Committee'],
      ['Enacted', 'Enacted'],
    ]
    if (!validStatusPairs.some(([houseStatus, senateStatus]) => {
      return houseStatus === billData.houseStatus && senateStatus === billData.senateStatus
    })) {
      throw new Error(
        `Invalid statuses for bill ${billData.houseBillNumber} / ${billData.senateBillNumber}: ` +
        `house status "${billData.houseStatus}", senate status "${billData.senateStatus}"`)
    }
  }

  const billNamesToConsolidatedBillsMap = new Map()
  sponsoredBills.forEach((sponsoredBill) => {
    const [billNumber, billData] = sponsoredBill
    const name = billData.shorthand_title.toLowerCase().trim()
    let chamber = Array.from(billNumber)[0] == 'H' ? 'house' : 'senate'
    if (billNamesToConsolidatedBillsMap.has(name)) {
      // Found a paired bill
      const pairedBill = billNamesToConsolidatedBillsMap.get(name)
      pairedBill[`${chamber}BillNumber`] = billNumber
      pairedBill[`${chamber}Status`] = billData.status
      pairedBill[`${chamber}LeadSponsors`] = billData.sponsors.split('&').map(sponsor => sponsor.trim())
      billData['houseBillNumber'] = pairedBill['houseBillNumber']
      billData['senateBillNumber'] = pairedBill['senateBillNumber']
      billData['houseStatus'] = pairedBill['houseStatus']
      billData['senateStatus'] = pairedBill['senateStatus']
      billData['senateLeadSponsors'] = pairedBill['senateLeadSponsors']
      billData['houseLeadSponsors'] = pairedBill['houseLeadSponsors']
      billData.sponsors = billData.senateLeadSponsors.concat(billData.houseLeadSponsors).join(', ')
      validateBillStatuses(pairedBill)
    } else {
      // First occurrence of this name
      billData[`${chamber}BillNumber`] = billNumber
      billData[`${chamber}Status`] = billData.status
      billData[`${chamber}LeadSponsors`] = billData.sponsors.split('&').map(sponsor => sponsor.trim())
      billNamesToConsolidatedBillsMap.set(name, billData)
    }
  })

  const consolidatedBills = Array.from(billNamesToConsolidatedBillsMap.values());

  consolidatedBills.forEach((billData) => {
    let otherBillNames = ''
    let sortedSponsors = sponsors
      .filter((sponsor) => {
        if (!sponsor.id) return false
        for (const bills in sponsor.sponsorshipData) {
          if (bills.includes(billData.bill_number) && sponsor.sponsorshipData[bills]) {
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

    const createPageData = {
      component: sponsoredBillTemplate,
      context: {
        billData: { ...billData, otherBillNames },
        sponsors: sortedSponsors,
        houseSponsors: sortedSponsors.filter(isHouseRep),
        senateSponsors: sortedSponsors.filter(isSenator),
        votesSessionOrdinal,
        sponsorshipsSessionNumber,
      },
    }
    if (billData.houseBillNumber !== undefined) {
      const createPageHouseBillData = { ...createPageData, path: `/sponsorships/${billData.houseBillNumber}` }
      createPage(createPageHouseBillData)
    }
    if (billData.senateBillNumber !== undefined) {
      const createPageSenateBillData = { ...createPageData, path: `/sponsorships/${billData.senateBillNumber}` }
      createPage(createPageSenateBillData)
    }
  })

  const allSponsoredBillsTemplate = path.resolve(`./src/components/sponsorships/index.js`)

  createPage({
    path: `/sponsorships/all-bills`,
    component: allSponsoredBillsTemplate,
    context: {
      consolidatedBills,
    },
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
