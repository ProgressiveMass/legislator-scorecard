const termDict = {
  '2015-2016': '189th',
  '2017-2018': '190th',
  '2019-2020': '191st',
  '2021-2022': '192nd',
  '2023-2024': '193rd',
}

const getSessionNumber = (yearRange) => termDict[yearRange]

const getLegislatorUrlParams = (legislator) => {
  const firstName = legislator.givenName ?? legislator.given_name
  const lastName = legislator.familyName ?? legislator.family_name
  return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
}

const isHouseRep = (legislator) => {
  return legislator.email.includes('mahouse')
}

const isSenator = (legislator) => {
  return legislator.email.includes('masenate')
}

function consolidateBills(bills) {
  const nameMap = new Map()
  for (const [bill_number, bill] of bills) {
    const name = bill.shorthand_title.toLowerCase().trim()
    chamber = Array.from(bill_number)[0] == 'H' ? 'house' : 'senate'
    if (nameMap.has(name)) {
      // Found a paired bill
      const pairedBill = nameMap.get(name)
      pairedBill[`${chamber}BillNumber`] = bill_number
      pairedBill[`${chamber}Status`] = bill.status
    } else {
      // First occurrence of this name
      bill[`${chamber}BillNumber`] = bill_number
      bill[`${chamber}Status`] = bill.status
      nameMap.set(name, bill)
    }
  }
  return Array.from(nameMap.values())
}

const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
}

const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
  phoneAndUp: `(min-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndUp: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptop / 16}rem)`,
}

module.exports = {
  getSessionNumber,
  getLegislatorUrlParams,
  isHouseRep,
  isSenator,
  consolidateBills,
  BREAKPOINTS,
  QUERIES,
}
