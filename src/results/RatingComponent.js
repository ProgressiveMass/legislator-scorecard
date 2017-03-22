import React, { PropTypes } from 'react'

const RatingComponent = (props) => {
  if (!props.rating) return null

  return (
    <div className='progress-component'>
      <h2 className='sr-only'>Progressive Ranking Summary</h2>
      <p className='sr-only'>
        Voted with the progressive position {props.rating.legislator} percent of the time
      </p>
      <div aria-hidden='aria-hidden'>
        <div>
          <span className='label'>
            {props.chamber === 'upper' ? 'Senator' : 'Rep'}&nbsp;
            {props.legislatorName}'s votes:
          </span>
          <div className='progress' aria-hidden>
            <div className='progress-bar bg-primary' style={{ width: props.rating.legislator + '%' }} >
              {props.rating.legislator}% progressive
            </div>
          </div>
        </div>

        <div>
          <span className='label'>{props.chamber === 'upper' ? 'Senate' : 'House'} average:</span>
          <div className='progress'>
            <div className='progress-bar bg-primary' style={{ width: props.rating.average + '%' }} >
              {props.rating.average + '%'} progressive
            </div>
          </div>
        </div>
      </div>

      <div className='clearfix'>
        <div className='mt-2 pull-right'>
          <a href='http://www.progressivemass.com/189thscorecard-senate'
            target='_blank'
          >
            Rating based on votes in the 2015-2016 session.
          </a>
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
