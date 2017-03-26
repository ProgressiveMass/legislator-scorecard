import React, { PropTypes } from 'react'

const RatingComponent = (props) => {
  if (!props.rating) return null

  const renderVoteSection = (props) => {
    return (
      <div>
        <p className='sr-only'>
          Voted with the progressive position {props.rating.votes.legislator} percent of the time.
        </p>
        <div aria-hidden>
          <span className='label' style={{ fontSize: '1.2rem' }}>
            {props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
            {props.legislatorName}'s votes
          </span>
          <div className='progress' aria-hidden>
            <div className='progress-bar bg-primary' style={{ width: props.rating.votes.legislator + '%' }} >
              <b>{props.rating.votes.legislator}%</b>&nbsp;&nbsp;progressive
            </div>
          </div>
        </div>
        <div aria-hidden>
          <span className='label'>{props.chamber === 'upper' ? 'Senate' : 'House'} average:</span>
          <div className='progress'>
            <div className='progress-bar bg-primary' style={{ width: props.rating.votes.average + '%' }} >
              <b>{props.rating.votes.average}%</b>&nbsp;&nbsp;progressive
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='progress-component'>
      <h2 className='sr-only'>Progressive Ranking Summary</h2>
      {
        props.rating.votes.legislator ? renderVoteSection(props)
          : <span className='text-muted font-weight-bold'>
            No voting data available, probably because this is a first-term legislator.
          </span>
      }

      <div className='mt-4'>
        <div className='label' style={{ fontSize: '1.2rem' }}>
          {props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
          {props.legislatorName} cosponsored
        </div>
        <div style={{ fontSize : '2rem' }}>
          <b className={`${props.rating.cosponsorship.legislator > 3 ? 'text-primary' : 'text-danger'}`}>
            {props.rating.cosponsorship.legislator}
          </b>&nbsp;progressive bills
        </div>
        <div>out of&nbsp;
          <b className='text-primary'>{props.rating.cosponsorship.total}</b>
              &nbsp;endorsed by Progressive Mass
        </div>

      </div>
    </div>
  )
}

export default RatingComponent

RatingComponent.propTypes = {
  voteRating : PropTypes.string.isRequired,
  voteSummary : PropTypes.number.isRequired,
  lastName : PropTypes.string.isRequired
}
