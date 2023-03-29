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

module.exports = {
  getSessionNumber,
  getLegislatorUrlParams,
}
