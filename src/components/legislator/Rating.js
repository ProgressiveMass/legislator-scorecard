import React from 'react'
import PropTypes from 'prop-types'
import ProgressBarWContext from '../progressBar'
import ProgressBar from '../progressBar/ProgressBar'
import { getSessionNumber } from '../../utilities'

export default class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.renderVoteSection = this.renderVoteSection.bind(this)
    this.renderCosponsorshipSection = this.renderCosponsorshipSection.bind(this)
    this.renderMedians = this.renderMedians.bind(this)
  }

  renderMedians() {
    return (
      <div className='d-flex'>
        <div className='flex-grow mr-2'>
          <div className='average-data'>
            Median {this.props.chamber === 'senate' ? 'Sen.' : 'House'} Democrat
          </div>
          <ProgressBar
            width={this.props.rating.votes.cumulative.median.democrat}
          />
        </div>
        <div className='flex-grow ml-2'>
          <div className='average-data'>
            Median {this.props.chamber === 'senate' ? 'Sen.' : 'House'}{' '}
            Republican
          </div>
          <ProgressBar
            width={this.props.rating.votes.cumulative.median.republican}
          />
        </div>
      </div>
    )
  }

  renderVoteSection() {
    const fontSize = Math.min(34 - this.props.lastName.length, 18)
    const sessionNumber = getSessionNumber(
      this.props.rating.votes.cumulative.term
    )
    return (
      <div>
        <div className='sr-only'>
          <h3>Vote information</h3>
          <p id='sr-stats'>
            {`Voted with the progressive position ${this.props.rating.votes.score} percent of the time.`}
            {`The median democrat progressive rating was ${this.props.rating.votes.cumulative.median.democrat} percent.`}
            {`The median republican progressive rating was ${this.props.rating.votes.cumulative.median.republican} percent.`}
          </p>
        </div>

        <div aria-hidden>
          <div className='mb-2'>
            <b
              className='d-block mb-1  heading-font'
              style={{ fontSize: fontSize }}>
              {this.props.title}&nbsp;
              {this.props.lastName}&#39;s votes&nbsp;
              <span className='text-lowercase' style={{ fontSize: '1rem' }}>
                ({this.props.rating.votes.cumulative.term})
              </span>
            </b>
            <ProgressBarWContext
              data={this.props.rating.votes}
              large
              sessionNumber={sessionNumber}
            />
          </div>
          {this.renderMedians()}
        </div>
      </div>
    )
  }

  renderCosponsorshipSection() {
    if (isNaN(this.props.rating.sponsorship.legislator)) return null

    return (
      <div className='mt-4'>
        <h3
          style={{
            fontSize: '18px',
            position: 'relative',
            top: '.5rem',
            fontWeight: 'bold',
          }}>
          {this.props.title}&nbsp;
          {this.props.lastName} cosponsored
        </h3>
        <div
          style={{ fontSize: '2.5rem' }}
          className='mb-2 heading-font cosponsorship-summary'>
          <b
            className={`${
              this.props.rating.sponsorship.legislator > 3
                ? 'text-primary'
                : 'text-danger'
            }`}>
            {this.props.rating.sponsorship.legislator}
          </b>
          &nbsp;
          <span className='font-weight-light'>
            progressive{' '}
            {this.props.rating.sponsorship.legislator === 1 ? 'bill' : 'bills'}
          </span>
        </div>
        <div style={{ position: 'relative', top: '-.4rem' }}>
          out of&nbsp;
          <b>{this.props.rating.sponsorship.total}</b>
          &nbsp;endorsed by Prog. Mass for{' '}
          {this.props.rating.sponsorship.cumulative.term}&nbsp;
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.rating) return null

    return (
      <div className='progress-component'>
        <h2 className='sr-only'>Progressive Ranking Summary</h2>
        {this.renderVoteSection()}
        {this.renderCosponsorshipSection()}
      </div>
    )
  }
}

Rating.propTypes = {
  rating: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
