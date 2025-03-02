const termDict = {
  '2015-2016': '189th',
  '2017-2018': '190th',
  '2019-2020': '191st',
  '2021-2022': '192nd',
  '2023-2024': '193rd',
  '2025-2026': '194th',
}

const getSessionNumber = (yearRange) => termDict[yearRange]

const getLegislatorUrlParams = (legislator) => {
  const firstName = legislator.givenName ?? legislator.given_name
  const lastName = legislator.familyName ?? legislator.family_name
  return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
}

const isHouseRep = (legislator) => isMemberOfChamber(legislator, 'mahouse')

const isSenator = (legislator) => isMemberOfChamber(legislator, 'masenate')

const isMemberOfChamber = (legislator, chamber) => {
  try {
    return legislator.email.includes(chamber)
  } catch (e) {
    throw new Error("Problem checking email for legislator with ID: " + legislator.id)
  }
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
  BREAKPOINTS,
  QUERIES,
}
