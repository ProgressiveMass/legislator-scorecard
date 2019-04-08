const fs = require('fs-extra')

// because this is inconsistent in the spreadsheets
const tagMap = {
  'shared prosperity': 'economy',
  'all means all': 'justice & equality',
  'good govt/strong democracy': 'government',
  'good government & strong democracy': 'government',
  'strong democracy': 'government',
  'infrastructure/environment': 'environment',
  'sustainable infrastructure & environmental protection': 'environment',
}

const normalizeBillNumber = billNumber => billNumber.replace(/\./g, '')
const normalizeTags = tagString => {
  const tags = tagString
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
    .map(tag => tag.toLowerCase())
    .map(tag => tagMap[tag])
  return tags
}

// handles house, senate, and "sponsored" sheets
const buildLegislationObject = (legislation, key) => {
  const processedLegislation = legislation.slice(1).reduce((acc, row) => {
    const obj = row.reduce((acc, cell, i) => {
      acc[legislation[0][i]] = cell
      return acc
    }, {})
    obj.bill_number = normalizeBillNumber(obj.bill_number)
    obj.tags = normalizeTags(obj.tags)
    acc[obj[key]] = obj
    return acc
  }, {})
  return processedLegislation
}

const addYesAndNoVotes = (bills, votes) => {
  const rollCallRow = votes[2]
  rollCallRow.forEach((rollCallNumber, index) => {
    if (!rollCallNumber || !rollCallNumber.trim()) return
    const billVotes = votes.map(row => row[index])

    const progressivePosition = bills[
      rollCallNumber
    ].progressive_position.toLowerCase()
    let yesVotes, noVotes
    if (progressivePosition === 'no') {
      yesVotes = billVotes.filter(v => v.trim() === '-').length
      noVotes = billVotes.filter(v => v.trim() === '+').length
    } else {
      yesVotes = billVotes.filter(v => v.trim() === '+').length
      noVotes = billVotes.filter(v => v.trim() === '-').length
    }

    bills[rollCallNumber].noVotes = noVotes
    bills[rollCallNumber].yesVotes = yesVotes
  })
}

const cleanDescription = bills => {
  Object.keys(bills).forEach(rollCallNumber => {
    const descriptionLines = bills[rollCallNumber].description
      .split(/\n/)
      .filter(Boolean)
    if (descriptionLines.length === 1)
      bills[rollCallNumber].description = descriptionLines[0]
    else bills[rollCallNumber].description = descriptionLines[1]
  })
}

const addBillUrls = (bills, session) => {
  Object.keys(bills).forEach(rollCallNumber => {
    const url = `https://malegislature.gov/Bills/${session}/${
      bills[rollCallNumber].bill_number
    }`
    bills[rollCallNumber].url = url
  })
}

const buildVoteObject = (votes, bills) => {
  const rollCallNumberRow = votes[2]

  // return array instead of object because gatsby's graphql queries
  // can only return bulk items in an array
  return votes
    .map(row => {
      const openStatesLegislatorId = row[0]
      if (!openStatesLegislatorId) return

      const votes = row.slice(2).reduce((acc, vote, index) => {
        const rollCallNumber = rollCallNumberRow[index + 2]
        acc[rollCallNumber] = vote
        return acc
      }, {})

      const voteCount = Object.values(votes).filter(vote => {
        return vote.toLowerCase() !== 'n/a'
      }).length

      const totalScore = Object.entries(votes).reduce(
        (acc, [rollCallNumber, vote]) => {
          if (vote.trim() === '+') {
            return acc + 1
          }
          return acc
        },
        0
      )

      const percentageScore = Math.round((totalScore / voteCount) * 100)

      return {
        id: openStatesLegislatorId,
        data: votes,
        score: percentageScore,
        recordedVotePercentage: Math.round(
          (voteCount / Object.keys(votes).length) * 100
        ),
      }
    })
    .filter(Boolean)
}

const buildSponsorshipObject = sponsorship => {
  const billNumbers = sponsorship.map(s => s[1]).slice(2)
  const openStateIds = sponsorship[0]
  return openStateIds
    .map((openStatesId, legislatorIndex) => {
      if (!openStatesId) return
      const data = billNumbers.reduce((acc, billNo, i) => {
        // for easier matching in gatsby-node.js
        billNo = billNo.replace(/\./g, '')
        acc[billNo] = sponsorship[i + 2][legislatorIndex]
        return acc
      }, {})
      const score = parseInt(
        Object.values(data)
          .reduce((acc, curr) => {
            if (curr.toLowerCase() === 'y') return acc + 1
            return acc
          }, 0)
          .toFixed()
      )

      return {
        id: openStatesId,
        data,
        score,
      }
    })
    .filter(Boolean)
}

const sessionDict = {
  '2017': 190,
  '2019': 191,
  '2021': 192,
}

const buildLegislationDataForYear = year => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/tmp/${year}.json`, 'utf8')
  )

  ;['sponsored', 'house', 'senate'].forEach(type => {
    const key = type === 'sponsored' ? 'bill_number' : 'roll_call_number'
    data[`${type}Bills`] = buildLegislationObject(data[`${type}Bills`], key)
  })

  // add additional vote data to bills
  // modifies in-place
  ;['house', 'senate'].forEach(type => {
    if (!data[`${type}Votes`] || !Object.keys(data[`${type}Bills`]).length)
      return
    addYesAndNoVotes(data[`${type}Bills`], data[`${type}Votes`])
  })
  ;['house', 'senate'].forEach(type => {
    cleanDescription(data[`${type}Bills`])
    addBillUrls(data[`${type}Bills`], sessionDict[year])
  })

  if (data.sponsorship.length)
    data.sponsorship = buildSponsorshipObject(data.sponsorship)

  if (data.houseVotes)
    data.houseVotes = buildVoteObject(data.houseVotes, data.houseBills)
  if (data.senateVotes)
    data.senateVotes = buildVoteObject(data.senateVotes, data.senateBills)

  return data
}

module.exports = () => {
  return {
    2017: buildLegislationDataForYear(2017),
    2019: buildLegislationDataForYear(2019),
  }
}
