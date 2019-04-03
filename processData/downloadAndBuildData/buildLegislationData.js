const fs = require('fs-extra')

const buildLegislationObject = legislation => {
  const processedLegislation = legislation.slice(1).reduce((acc, row) => {
    const obj = row.reduce((acc, cell, i) => {
      acc[legislation[0][i]] = cell
      return acc
    }, {})
    // for easier matching in gatsby-node.js
    obj.bill_number = obj.bill_number.replace(/\./g, '')
    acc[obj.bill_number] = obj
    return acc
  }, {})
  return processedLegislation
}

const buildVoteObject = votes => {
  debugger // eslint-disable-line
  const progressivePositionToVoteType = position => {
    if (position.trim().toLowerCase() === 'yes') return '+'
    else if (position.trim().toLowerCase() === 'no') return '-'
    else {
      throw new Error('did not recognize position type')
    }
  }
  const progressivePositionDict = votes[0]
    .slice(2)
    .reduce((acc, progressivePosition, index) => {
      acc[votes[1][index + 2]] = progressivePositionToVoteType(
        progressivePosition
      )
      return acc
    }, {})

  const legislationRow = votes[1]
  // return array instead of object because gatsby's graphql queries
  // can only return bulk items in an array
  return votes
    .map(row => {
      const openStatesLegislatorId = row[0]
      if (!openStatesLegislatorId) return

      debugger // eslint-disable-line

      const votes = row.slice(2).reduce((acc, vote, index) => {
        const billName = legislationRow[index + 2]
        acc[billName] = vote
        return acc
      }, {})

      const voteCount = Object.values(votes).filter(vote => {
        return vote.toLowerCase() !== 'n/a'
      }).length

      const score = Math.round(
        (Object.entries(votes).reduce((acc, [bill, vote]) => {
          if (vote.trim() === progressivePositionDict[bill]) {
            return acc + 1
          }
          return acc
        }, 0) /
          voteCount) *
          100
      )

      return {
        id: openStatesLegislatorId,
        data: votes,
        score,
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

const buildLegislationDataForYear = year => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/tmp/${year}.json`, 'utf8')
  )

  ;['sponsored', 'house', 'senate'].forEach(type => {
    data[`${type}Bills`] = buildLegislationObject(data[`${type}Bills`])
  })

  if (data.sponsorship.length)
    data.sponsorship = buildSponsorshipObject(data.sponsorship)

  if (data.houseVotes) data.houseVotes = buildVoteObject(data.houseVotes)
  if (data.senateVotes) data.senateVotes = buildVoteObject(data.senateVotes)

  return data
}

module.exports = () => {
  return {
    2017: buildLegislationDataForYear(2017),
    2019: buildLegislationDataForYear(2019),
  }
}
