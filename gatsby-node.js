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
  let sessionVotesYear = 2023
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

  const sponsoredBillTemplate = path.resolve(`./src/components/sponsorships/sponsorships.js`)

  let sponsors = legislationData[sessionYear].sponsorship.map((sponsorshipData) => {
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

  const consolidateBills = (billNumber, billData, billNameMap) => {
    const name = billData.shorthand_title.toLowerCase().trim()
    let chamber = Array.from(billNumber)[0] == 'H' ? 'house' : 'senate'
    if (billNameMap.has(name)) {
      // Found a paired bill
      const pairedBill = billNameMap.get(name)
      pairedBill[`${chamber}BillNumber`] = billNumber
      pairedBill[`${chamber}Status`] = billData.status
      billData['houseBillNumber'] = pairedBill['houseBillNumber']
      billData['senateBillNumber'] = pairedBill['senateBillNumber']
      billData['houseStatus'] = pairedBill['houseStatus']
      billData['senateStatus'] = pairedBill['senateStatus']
      validateBillStatuses(pairedBill)
    } else {
      // First occurrence of this name
      billData[`${chamber}BillNumber`] = billNumber
      billData[`${chamber}Status`] = billData.status
      billNameMap.set(name, billData)
    }
  }

  const nameMap = new Map()
  sponsoredBills.forEach((sponsoredBill) => {
    let sortedSponsors = []
    const [billNumber, billData] = sponsoredBill
    consolidateBills(billNumber, billData, nameMap)
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
  const consolidatedBills = Array.from(nameMap.values());

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
