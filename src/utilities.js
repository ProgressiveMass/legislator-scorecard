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

function consolidateBillNumbers(arr) {
  const nameMap = new Map()
  for (const obj of arr) {
    const name = obj.shorthand_title.toLowerCase().trim()
    const bill_number = obj.bill_number
    if (nameMap.has(name)) {
      // Found a duplicate
      const duplicateObj = nameMap.get(name)
      if (!duplicateObj.otherNames) {
        duplicateObj.otherNames = [duplicateObj.bill_number]
      }
      duplicateObj.otherNames.push(bill_number)
    } else {
      // First occurrence of this name
      nameMap.set(name, obj)
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
  consolidateBillNumbers,
  BREAKPOINTS,
  QUERIES,
}
