import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import LegislatorTable from './LegislatorTable'

const LegislatorVote = ({ vote, progressivePosition }) => {
  if (!progressivePosition) return 'error: progressive position not found'
  let badgeClass = 'badge'

  const oppositeDict = (position) => {
    if (position.toLowerCase() === 'yes') return 'No'
    else if (position.toLowerCase() === 'no') return 'Yes'
    else return 'N/A'
  }

  if (vote.trim() === '+') {
    badgeClass += ' badge-primary'
  } else if (vote === '-' || vote === 'NV' || vote === 'NVP') {
    badgeClass += ' badge-danger'
  } else {
    badgeClass += ' badge-clear'
  }

  let badgeText = 'N/A'
  if (vote.trim() === '+') {
    badgeText =
      progressivePosition && progressivePosition[0]
        ? progressivePosition[0].toUpperCase() +
          progressivePosition.slice(1).toLowerCase()
        : ''
  } else if (vote === '-') {
    badgeText = oppositeDict(progressivePosition)
  } else if (vote === 'NV') {
    badgeText = 'Absent'
  } else if (vote === 'NVP') {
    badgeText = 'Present'
  }

  return <span className={badgeClass}>{badgeText}</span>
}

const CumulativeVote = ({ yesVotes, noVotes, progressivePosition }) => {
  progressivePosition = progressivePosition || ''
  const yesBlock = (
    <div>
      <span className='label votes-fw'>Yes:</span>&nbsp;
      <span
        className={`badge ${
          progressivePosition.toLowerCase() === 'yes'
            ? 'badge-primary'
            : 'badge-danger'
        }`}>
        {yesVotes}
      </span>
    </div>
  )

  const noBlock = (
    <div>
      <span className='label votes-fw'>No:</span>&nbsp;
      <span
        className={`badge ${
          progressivePosition.toLowerCase() === 'no'
            ? 'badge-primary'
            : 'badge-danger'
        }`}>
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
    roll_call_url,
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
        <div className='text-muted font-weight-bold'>
          {bill_number}&nbsp;
          <a
            href={roll_call_url}
            target='_blank'
            // className='muted-link'
            rel='noreferrer'>
            {roll_call_number}
          </a>
        </div>
        <div>{tags}</div>
      </td>
      <td style={{ width: '25%' }}>
        <Link
          to='/bill-sponsors'
          state={{
            url,
            title,
            bill_number,
            roll_call_number,
            roll_call_url,
            yesVotes,
            noVotes,
            progressive_position: progressivePosition,
            description,
            yourLegislator,
          }}
          className='font-weight-bold'>
          {title}
          <div />
        </Link>
      </td>
      <td style={{ width: '35%' }}>
        <p>{description}</p>
        <p>
          <span className='label'>Progressive Position:</span>&nbsp;
          <span className='badge badge-primary'>{progressivePosition}</span>
        </p>
      </td>
      <td style={{ width: '12.5%' }} data-label={`${lastName}'s Vote`}>
        <LegislatorVote
          vote={yourLegislator}
          progressivePosition={progressivePosition}
        />
      </td>
      <td style={{ width: '12.5%' }} data-label='Total Votes'>
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
      href='https://gdoc.pub/doc/19eWMYZ3IZaT-YFqswn-LqGOnYzHMID7LXEj1Gn1GNu0'
      target='_blank'
      rel='noreferrer'>
      Learn more about the benefits and limitations of a scorecard.
    </a>
  </>
)

const VoteTable = ({ data: { votes }, lastName }) => {
  return (
    <LegislatorTable
      title='Voting Record'
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
                href='https://www.progressivemass.com/190thscorecard-house'
                target='_blank'
                rel='noreferrer'>
                Progressive Mass
              </a>
            </th>
            <th style={{ width: '12.5%' }}>{lastName}&#39;s Vote</th>
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
