import React, { PropTypes } from 'react'
import ProgressBar from './ProgressBarComponent'

export default class RatingComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderVoteSection = this.renderVoteSection.bind(this)
    this.renderCosponsorshipSection = this.renderCosponsorshipSection.bind(this)
  }

  renderVoteSection () {
    return (
      <div>
        <p className='sr-only'>
          {`Voted with the progressive position ${this.props.rating.votes.legislator} percent of the time.`}
          {`The average democrat progressive rating was ${this.props.rating.votes.cumulative.democratAverage} percent.`}
          {`The average republican progressive rating was ${this.props.rating.votes.cumulative.republicanAverage} percent.`}
        </p>
        <div aria-hidden>
          <span className='label d-block mb-1' style={{ fontSize: '1.2rem' }}>
            {this.props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
            {this.props.legislatorName}'s votes&nbsp;
            <span className='text-lowercase font-weight-normal' style={{ fontSize: '1rem' }}>(189th Session)</span>
          </span>
          <ProgressBar width={this.props.rating.votes.legislator} animate large />
        </div>
        <div aria-hidden className='d-flex'>
          <div className='flex-grow mr-2'>
            <span className='label'>
              Avg {this.props.chamber === 'upper' ? 'Sen.' : 'House'} Democrat</span>
            <ProgressBar width={this.props.rating.votes.cumulative.democratAverage} />
          </div>
          <div div className='flex-grow ml-2'>
            <span className='label'>
              Avg {this.props.chamber === 'upper' ? 'Sen.' : 'House'} Republican</span>
            <ProgressBar width={this.props.rating.votes.cumulative.republicanAverage} />
          </div>
        </div>
      </div>
    )
  }

  renderCosponsorshipSection () {
    return (
      <div className='mt-3'>
        <div className='label' style={{ fontSize: '1.2rem', position: 'relative', top: '.5rem' }}>
          {this.props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
          {this.props.legislatorName} cosponsored
        </div>
        <div style={{ fontSize : '2.2rem' }}>
          <b className={`${this.props.rating.cosponsorship.legislator > 3 ? 'text-primary' : 'text-danger'}`}>
            {this.props.rating.cosponsorship.legislator}
          </b>&nbsp;<span className='font-weight-light'>progressive bills</span>
        </div>
        <div>out of&nbsp;
          <b className='text-primary'>{this.props.rating.cosponsorship.total}</b>
          &nbsp;endorsed by Prog. Mass for 190th session
        </div>
      </div>
    )
  }

  render () {
    if (!this.props.rating) return null

    return (
      <div className='progress-component'>
        <h2 className='sr-only'>Progressive Ranking Summary</h2>
        {
          this.props.rating.votes.legislator ? this.renderVoteSection()
            : <span className='text-muted font-weight-bold'>
              No voting data available, probably because this is a first-term legislator.
            </span>
        }
        { this.renderCosponsorshipSection() }
      </div>
    )
  }
}

RatingComponent.propTypes = {
  rating : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired,
  legislatorName : PropTypes.string.isRequired

}
