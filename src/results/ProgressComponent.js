import React, { PropTypes } from 'react'

const ProgressComponent = (props) => {
  if (!props.votes) return null
  const progressive = props.votes.filter((v) => {
    return (v.senatorVote === '+' && v.progressivePosition === 'Yes') ||
    (v.senatorVote === '-' && v.progressivePosition === 'No')
  }).length
  const notProgressive = props.votes.filter((v) => {
    return (v.senatorVote === '+' && v.progressivePosition === 'No') ||
    (v.senatorVote === '-' && v.progressivePosition === 'Yes')
  }).length

  return (
    <div className='progress-component'>
      <h2 className='sr-only'>Progressive Ranking Summary</h2>
      <p className='sr-only'>
        Voted with the progressive position {props.voteRating} percent of the time
      </p>
      <div aria-hidden='aria-hidden'>
        <div>
          <span className='label'>{props.lastName}'s votes:</span>
          <div className='progress' aria-hidden>
            <div className='progress-bar bg-primary' style={{ width: props.voteRating }} >
              <b>{props.voteRating} progressive</b>
            </div>
          </div>
        </div>

        <div>
          <span className='label'>Senate average:</span>
          <div className='progress'>
            <div className='progress-bar bg-primary' style={{ width: props.voteSummary + '%' }} >
              <b>{props.voteSummary + '%'} progressive</b>
            </div>
          </div>
        </div>
      </div>

      <div className='clearfix'>
        <div className='mt-2 pull-right'>
          <a href='http://www.progressivemass.com/189thscorecard-senate'
            target='_blank'
          >
            <i className='fa fa-arrow-circle-o-right'>&nbsp;</i>Learn more about how scores are calculated
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProgressComponent

ProgressComponent.propTypes = {
}
