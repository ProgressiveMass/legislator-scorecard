import React, { PropTypes } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

export default class VoteTableComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderLegislatorVote (v, progressivePosition) {
    let badgeClass = 'badge'

    const oppositeDict = (term) => {
      if (term.toLowerCase() === 'yes') return 'No'
      else if (term.toLowerCase() === 'no') return 'Yes'
      else return 'N/A'
    }

    if (v === '+') {
      badgeClass += ' badge-primary'
    } else if (v === '-' || v === 'NV') {
      badgeClass += ' badge-danger'
    } else {
      badgeClass += ' badge-clear'
    }

    let badgeText = 'N/A'
    if (v === '+') {
      badgeText = progressivePosition[0].toUpperCase() + progressivePosition.slice(1).toLowerCase()
    } else if (v === '-') {
      badgeText = oppositeDict(progressivePosition)
    } else if (v === 'NV') {
      badgeText = 'No vote'
    }

    return <span className={badgeClass}>{badgeText}</span>
  }

  renderCumulativeVote (yesVotes, noVotes, progressivePosition) {
    const yesBlock = (<div>
      <span className='label votes-fw'>Yes:</span>&nbsp;
      <span className={`badge ${progressivePosition.toLowerCase() === 'yes' ? 'badge-primary' : 'badge-danger'}`}>
        {yesVotes}
      </span>
    </div>)

    const noBlock = (<div>
      <span className='label votes-fw'>No:</span>&nbsp;
      <span className={`badge ${progressivePosition.toLowerCase() === 'no' ? 'badge-primary' : 'badge-danger'}`}>
        {noVotes}
      </span>
    </div>)

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

  renderRow (v, i) {
    return (
      <tr key={i}>
        <td style={{ width: '30%' }}>
          <a href={v.url} target='_blank' className='font-weight-bold'>
            <div className='text-muted font-weight-normal'>{v.number}</div>
            {v.title}
            <div>
              <span className='sr-only'>Topics:</span>
              {v.tags ? v.tags.split(',').map((t) => {
                return <span className='badge badge-default mr-1'>{t}</span>
              }) : null}
            </div>
          </a>
        </td>
        <td style={{ width: '40%' }}>
          <p>
            {v.description}
          </p>
          <p>
            <span className='label'>Progressive Position:</span>&nbsp;
            <span className='badge badge-primary'>{v.progressivePosition}</span>
          </p>
        </td>
        <td style={{ width: '15%' }} data-label={`${this.props.legislatorName}'s Vote`}>
          {this.renderLegislatorVote(v.yourLegislator, v.progressivePosition)}
        </td>
        <td style={{ width: '15%' }} data-label='Total Votes'>
          {this.renderCumulativeVote(v.yesVotes, v.noVotes, v.progressivePosition)}
        </td>
      </tr>
    )
  }

  render () {
    const votes = this.props.data.votes
    if (!votes || votes.length === 0) {
      return <div className='table-container text-center'>
        <div style={{ paddingTop : '7rem' }}>
          <h3>This Data Isn't Available Yet.</h3>
          <p className='lead'>Please check back later.</p>
        </div>
      </div>
    }
    return (
      <div className='table-container'>
        <h4 className='sr-only'>Voting Record</h4>
        <div className='row no-gutters mt-4'>
          <div className='col-md-6'>
            <span className='label'>What makes a bill progressive?</span>
            <p>
              To learn more about the methodology for rating legislation, <a href='http://www.progressivemass.com/scorecards_and_roll_calls' target='_blank'>visit the Progressive Mass Legislative Scorecard homepage.</a>
            </p>
          </div>
        </div>

        <StickyContainer>
          <table className='table table-responsive table--top-row-fixede'>
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Bill</th>
                  <th style={{ width: '40%' }}>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachusetts</a></th>
                  <th style={{ width: '15%' }}>{this.props.legislatorName}'s Vote</th>
                  <th style={{ width: '15%' }}>Vote Tally</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              { votes.map((v, i) => {
                return this.renderRow(v, i)
              }, this)}
            </tbody>

          </table>
        </StickyContainer>
      </div>
    )
  }
}

VoteTableComponent.propTypes = {
  data : PropTypes.array.isRequired,
  lastName : PropTypes.string.isRequired,
  voteRating : PropTypes.string.isRequired,
  voteSummary : PropTypes.number.isRequired,
  legislatorName : PropTypes.string.isRequired

}
