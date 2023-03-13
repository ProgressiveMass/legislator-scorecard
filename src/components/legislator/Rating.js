import React from 'react'
import PropTypes from 'prop-types'
import ProgressBarWContext from '../progressBar'
import ProgressBar from '../progressBar/ProgressBar'
import { getSessionNumber } from '../../utilities'

const Rating = (props) => {
  const renderMedians = () => {
    return (
      <div className='d-flex'>
        <div className='flex-grow mr-2'>
          <div className='average-data'>
            Median {props.chamber === 'senate' ? 'Sen.' : 'House'} Democrat
          </div>
          <ProgressBar width={props.rating.votes.cumulative.median.democrat} />
        </div>
        <div className='flex-grow ml-2'>
          <div className='average-data'>
            Median {props.chamber === 'senate' ? 'Sen.' : 'House'} Republican
          </div>
          <ProgressBar
            width={props.rating.votes.cumulative.median.republican}
          />
        </div>
      </div>
    )
  }

  const renderVoteSection = () => {
    const fontSize = Math.min(34 - props.familyName.length, 18)
    const sessionNumber = getSessionNumber(props.rating.votes.cumulative.term)
    return (
      <div>
        <div className='sr-only'>
          <h3>Vote information</h3>
          <p id='sr-stats'>
            {`Voted with the progressive position ${props.rating.votes.score} percent of the time.`}
            {`The median democrat progressive rating was ${props.rating.votes.cumulative.median.democrat} percent.`}
            {`The median republican progressive rating was ${props.rating.votes.cumulative.median.republican} percent.`}
          </p>
        </div>

        <div aria-hidden>
          <div className='mb-2'>
            <b
              className='d-block mb-1  heading-font'
              style={{ fontSize: fontSize }}>
              {props.title}&nbsp;
              {props.familyName}&#39;s votes&nbsp;
              <span className='text-lowercase' style={{ fontSize: '1rem' }}>
                ({props.rating.votes.cumulative.term})
              </span>
            </b>
            <ProgressBarWContext
              data={props.rating.votes}
              large
              sessionNumber={sessionNumber}
            />
          </div>
          {renderMedians()}
        </div>
      </div>
    )
  }

  const renderCosponsorshipSection = () => {
    if (isNaN(props.rating.sponsorship.legislator)) return null

    return (
      <div className='mt-4'>
        <h3
          style={{
            fontSize: '18px',
            position: 'relative',
            top: '.5rem',
            fontWeight: 'bold',
          }}>
          {props.title}&nbsp;
          {props.familyName} cosponsored
        </h3>
        <div
          style={{ fontSize: '2.5rem' }}
          className='mb-2 heading-font cosponsorship-summary'>
          <b
            className={`${
              props.rating.sponsorship.legislator > 3
                ? 'text-primary'
                : 'text-danger'
            }`}>
            {props.rating.sponsorship.legislator}
          </b>
          &nbsp;
          <span className='font-weight-light'>
            progressive{' '}
            {props.rating.sponsorship.legislator === 1 ? 'bill' : 'bills'}
          </span>
        </div>
        <div style={{ position: 'relative', top: '-.4rem' }}>
          out of&nbsp;
          <b>{props.rating.sponsorship.total}</b>
          &nbsp;featured by Prog. Mass for{' '}
          {props.rating.sponsorship.cumulative.term}&nbsp;
        </div>
      </div>
    )
  }

  if (!props.rating) return null

  return (
    <div className='progress-component'>
      <h2 className='sr-only'>Progressive Ranking Summary</h2>
      {renderVoteSection()}
      {renderCosponsorshipSection()}
    </div>
  )
}

export default Rating
Rating.propTypes = {
  rating: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
