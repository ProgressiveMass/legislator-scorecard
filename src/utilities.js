const termDict = {
  '2015-2016': '189th',
  '2017-2018': '190th',
  '2019-2020': '191st',
  '2021-2022': '192nd',
}

export const getSessionNumber = (yearRange) => termDict[yearRange]
