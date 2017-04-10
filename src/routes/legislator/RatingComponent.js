import React, { PropTypes } from 'react'
import ProgressBarWContext from './ProgressBarWContextComponent'
import ProgressBar from './ProgressBarComponent'

export default class RatingComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderVoteSection = this.renderVoteSection.bind(this)
    this.renderCosponsorshipSection = this.renderCosponsorshipSection.bind(this)
    this.renderAvgDem = this.renderAvgDem.bind(this)
  }

  renderAvgDem () {
    if (this.props.chamber === 'upper') {
      return (<div className='flex-grow mr-2'>
        <span className='label'>
          Avg Sen. Democrat
        </span>
        <ProgressBar width={this.props.rating.votes.cumulative.democratAverage} />
      </div>)
    } else if (this.props.chamber === 'lower') {
      return (<div className='flex-grow mr-2'>
        <span className='label'>
          Speaker Deleo (Dem)
        </span>
        <ProgressBar width={this.props.rating.votes.cumulative.speaker} />
      </div>)
    }
  }

  renderVoteSection () {
    return (
      <div>
        <p className='sr-only'>
          {`Voted with the progressive position ${this.props.rating.votes.voteRating} percent of the time.`}
          {`The average democrat progressive rating was ${this.props.rating.votes.cumulative.democratAverage} percent.`}
          {`The average republican progressive rating was ${this.props.rating.votes.cumulative.republicanAverage} percent.`}
          {this.props.rating.votes.cumulative.speaker ? `The House Speaker progressive rating was ${this.props.rating.votes.cumulative.speaker} percent.` : ''}
        </p>
        <div aria-hidden>
          <div className='mb-2'>
            <span className='label d-block mb-1' style={{ fontSize: '1.1rem' }}>
              {this.props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
              {this.props.legislatorName}'s votes&nbsp;
              <span className='text-lowercase font-weight-normal' style={{ fontSize: '1rem' }}>(189th Session)</span>
            </span>
            <ProgressBarWContext data={this.props.rating.votes} animate large />
          </div>
          <div className='d-flex'>
            {this.renderAvgDem()}
            <div className='flex-grow ml-2'>
              <span className='label'>
                Avg {this.props.chamber === 'upper' ? 'Sen.' : 'House'} Republican</span>
              <ProgressBar width={this.props.rating.votes.cumulative.republicanAverage} />
            </div>
          </div>
        </div>

      </div>
    )
  }

  renderCosponsorshipSection () {
    return (
      <div className='mt-4'>
        <div className='label' style={{ fontSize: '1.1rem', position: 'relative', top: '.5rem' }}>
          {this.props.chamber === 'upper' ? 'Sen.' : 'Rep.'}&nbsp;
          {this.props.legislatorName} cosponsored
        </div>
        <div style={{ fontSize : '2.2rem' }}>
          <b className={`${this.props.rating.cosponsorship.legislator > 3 ? 'text-primary' : 'text-danger'}`}>
            {this.props.rating.cosponsorship.legislator}
          </b>&nbsp;<span className='font-weight-light'>
            progressive {this.props.rating.cosponsorship.legislator === 1 ? 'bill' : 'bills'}
          </span>
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
        { this.renderVoteSection() }
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
