const termDict = {
  '2015-2016': '189th',
  '2017-2018': '190th',
  '2019-2020': '191st',
  '2021-2022': '192nd',
}

const getSessionNumber = (yearRange) => termDict[yearRange]

const getLegislatorUrlParams = (legislator) => {
  const firstName = legislator.givenName
    ? legislator.givenName
    : legislator.given_name ?? ''
  const lastName = legislator.familyName
    ? legislator.familyName
    : legislator.family_name ?? ''
  return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
}

const getImageFileNames = (legislatorName, legislatorDistrict) => {
  return (legislatorName + '-' + legislatorDistrict)
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[.,']/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // stackoverflow.com/questions/990904
}

module.exports = {
  getSessionNumber,
  getLegislatorUrlParams,
  getImageFileNames,
}
