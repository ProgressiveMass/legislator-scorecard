export const getLastName = name => {
  const splitName = name.split(/\s/)
  // last name if there's a final thing like "jr" or "the third"
  const possibleLast = splitName.find(item => item.match(/,$/))
  const lastName = possibleLast
    ? possibleLast.replace(',', '')
    : splitName.slice(-1)[0]
  return lastName
}

const termDict = {
  '2015-2016': '189th',
  '2017-2018': '190th',
  '2019-2020': '191st',
  '2021-2022': '192nd',
}

export const getSessionNumber = yearRange => termDict[yearRange]
