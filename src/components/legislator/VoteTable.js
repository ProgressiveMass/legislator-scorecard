import React from 'react'
import PropTypes from 'prop-types'
import LegislatorTable from './LegislatorTable'

const LegislatorVote = ({ v, progressivePosition }) => {
  let badgeClass = 'badge'

  const oppositeDict = position => {
    if (position.toLowerCase() === 'yes') return 'No'
    else if (position.toLowerCase() === 'no') return 'Yes'
    else return 'N/A'
  }

  if (v === '+') {
    badgeClass += ' badge-primary'
  } else if (v === '-' || v === 'NV' || v === 'NVP') {
    badgeClass += ' badge-danger'
  } else {
    badgeClass += ' badge-clear'
  }

  let badgeText = 'N/A'
  if (v === '+') {
    badgeText =
      progressivePosition[0].toUpperCase() +
      progressivePosition.slice(1).toLowerCase()
  } else if (v === '-') {
    badgeText = oppositeDict(progressivePosition)
  } else if (v === 'NV') {
    badgeText = 'No vote'
  } else if (v === 'NVP') {
    badgeText = 'Abstained'
  }

  return <span className={badgeClass}>{badgeText}</span>
}

const CumulativeVote = ({ yesVotes, noVotes, progressivePosition }) => {
  const yesBlock = (
    <div>
      <span className="label votes-fw">Yes:</span>&nbsp;
      <span
        className={`badge ${
          progressivePosition.toLowerCase() === 'yes'
            ? 'badge-primary'
            : 'badge-danger'
        }`}
      >
        {yesVotes}
      </span>
    </div>
  )

  const noBlock = (
    <div>
      <span className="label votes-fw">No:</span>&nbsp;
      <span
        className={`badge ${
          progressivePosition.toLowerCase() === 'no'
            ? 'badge-primary'
            : 'badge-danger'
        }`}
      >
        {noVotes}
      </span>
    </div>
  )

  if (parseInt(yesVotes) >= parseInt(noVotes)) {
    return (
      <div>
        {yesBlock}
        {noBlock}
      </div>
    )
  } else {
    return (
      <div>
        {noBlock}
        {yesBlock}
      </div>
    )
  }
}

const VoteRow = ({
  tags,
  rowData: {
    url,
    title,
    bill_number,
    roll_call_number,
    rollCallUrl,
    yesVotes,
    noVotes,
    progressive_position: progressivePosition,
    description,
    yourLegislator,
  },
  lastName,
}) => {
  return (
    <tr>
      <td style={{ width: '15%' }}>
        <div className="text-muted font-weight-bold">
          <a href={rollCallUrl} target="_blank" className="muted-link">
            {bill_number} {roll_call_number}
          </a>
        </div>
        <div>{tags}</div>
      </td>
      <td style={{ width: '25%' }}>
        <a href={url} target="_blank" className="font-weight-bold">
          {title}
          <div />
        </a>
      </td>
      <td style={{ width: '35%' }}>
        <p>{description}</p>
        <p>
          <span className="label">Progressive Position:</span>&nbsp;
          <span className="badge badge-primary">{progressivePosition}</span>
        </p>
      </td>
      <td style={{ width: '12.5%' }} data-label={`${lastName}'s Vote`}>
        <LegislatorVote
          yourLegislator={yourLegislator}
          progressivePosition={progressivePosition}
        />
      </td>
      <td style={{ width: '12.5%' }} data-label="Total Votes">
        <CumulativeVote
          yesVotes={yesVotes}
          noVotes={noVotes}
          progressivePosition={progressivePosition}
        />
      </td>
    </tr>
  )
}

const description = (
  <>
    Legislators are scored for their roll-called votes on bills and amendments
    where an important progressive advancement (or stopping a bad policy) is at
    stake.{' '}
    <a
      href="https://gdoc.pub/doc/19eWMYZ3IZaT-YFqswn-LqGOnYzHMID7LXEj1Gn1GNu0"
      target="_blank"
    >
      Learn more about the benefits and limitations of a scorecard.
    </a>
  </>
)

const VoteTable = ({ data: { votes }, lastName }) => {
  return (
    <LegislatorTable
      title="Voting Record"
      description={description}
      rowData={votes}
      lastName={lastName}
      rowComponent={VoteRow}
      head={
        <>
          <tr>
            <th style={{ width: '15%' }}>Bill</th>
            <th style={{ width: '25%' }}>Name</th>
            <th style={{ width: '35%' }}>
              Summary from{' '}
              <a
                href="https://www.progressivemass.com/190thscorecard-house"
                target="_blank"
              >
                Progressive Mass
              </a>
            </th>
            <th style={{ width: '12.5%' }}>{lastName}'s Vote</th>
            <th style={{ width: '12.5%' }}>Vote Tally</th>
          </tr>
        </>
      }
    />
  )
}

export default VoteTable

VoteTable.propTypes = {
  data: PropTypes.object.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
