import React, { PropTypes } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

import tagMap from './tagMap'

export default class VoteTableComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.filterRows = this.filterRows.bind(this)

    this.state = {
      tagFilter : ''
    }
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
    } else if (v === '-' || v === 'NV' || v === 'NVP') {
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
    } else if (v === 'NVP') {
      badgeText = 'Abstained'
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
    const tags = v.tags.map((t) => {
      return <button key={tagMap[t].name}
        className={`btn badge ${tagMap[t].badge}`}
        onClick={() => { this.toggleFilter(t) }}
             >
        {tagMap[t].name}
      </button>
    })

    return (
      <tr key={i}>
        <td style={{ width: '15%' }}>
          <div className='text-muted font-weight-bold'>
            <a href={v.rollCallUrl} target='_blank' className='muted-link'>
              {v.number}
            </a>
          </div>
          <div>
            {tags}

          </div>
        </td>
        <td style={{ width: '25%' }}>
          <a href={v.url} target='_blank' className='font-weight-bold'>
            {v.title}
            <div />
          </a>
        </td>
        <td style={{ width: '35%' }}>
          <p>
            {v.description}
          </p>
          <p>
            <span className='label'>Progressive Position:</span>&nbsp;
            <span className='badge badge-primary'>{v.progressivePosition}</span>
          </p>
        </td>
        <td style={{ width: '12.5%' }} data-label={`${this.props.legislatorName}'s Vote`}>
          {this.renderLegislatorVote(v.yourLegislator, v.progressivePosition)}
        </td>
        <td style={{ width: '12.5%' }} data-label='Total Votes'>
          {this.renderCumulativeVote(v.yesVotes, v.noVotes, v.progressivePosition)}
        </td>
      </tr>
    )
  }

  toggleFilter (t) {
    if (this.state.tagFilter === t) {
      this.setState({ tagFilter : '' })
    } else {
      this.setState({ tagFilter : t })
    }
  }

  renderTagFilters (tags) {
    return tags.map((t) => {
      let badgeClass = 'badge-default'
      if (!this.state.tagFilter || this.state.tagFilter === t) {
        badgeClass = tagMap[t].badge
      }
      return <li className='mr-1' key={tagMap[t].name}>
        <button
          className={`btn btn-sm badge ${badgeClass}`}
          style={{ fontSize : '.9rem' }}
          aria-pressed={this.state.tagFilter === t ? 'true' : 'false'}
          onClick={() => this.toggleFilter(t)}
        >
          {tagMap[t].name}

        </button>
      </li>
    })
  }

  filterRows (data) {
    if (!this.state.tagFilter) {
      return data
    } else {
      return data.filter((d) => {
        return d.tags.indexOf(this.state.tagFilter) > -1
      })
    }
  }

  render () {
    const votes = this.filterRows(this.props.data.votes)
    const tags = [...(new Set([].concat.apply([], this.props.data.votes.map((c) => c.tags))))]

    if (!votes || votes.length === 0) {
      return <div className='table-container'>
        <div className=' mx-auto p-5' style={{ maxWidth : '600px' }}>
          <h3>This Data Isn't Available Yet!</h3>
          <p className='lead'>
            Final scorecards will be released at the end of the session (Winter 2018). <br />
          </p>
          <p>
            Progressive Mass is currently considering how to provide more frequent updates on votes as they happen.
          </p>

        </div>
      </div>
    }
    return (
      <div className='table-container'>
        <h3 className='sr-only'>Voting Record</h3>

        <div className='row explanatory-text p-3 no-gutters'>
          <div className='col-md-6 pr-md-5'>
            <p>
            Legislators are scored for their roll-called votes on bills and amendments where an important progressive advancement (or stopping a bad policy) is at stake. </p>

          </div>
          <div className='col-md-6 pr-md-5'>
            <p>
              Assessing a legislator’s record is a challenging proposition. <br />
              <a href='http://www.progressivemass.com/scorecards_and_roll_calls' target='_blank'>Learn more about the benefits and limitations of a scorecard.</a>
            </p>
          </div>
        </div>

        <div className='mb-4 pt-4'>
          <span className='label d-md-inline-block mr-3'>Filter Bills By Topic:</span>
          <ul className='d-sm-inline-flex list-unstyled'>
            { this.renderTagFilters(tags) }
          </ul>
        </div>

        <StickyContainer>
          <table className='table table-responsive table--top-row-fixed'>
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Bill</th>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '35%' }}>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Mass</a></th>
                  <th style={{ width: '12.5%' }}>{this.props.legislatorName}'s Vote</th>
                  <th style={{ width: '12.5%' }}>Vote Tally</th>
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
  data : PropTypes.object.isRequired,
  legislatorName : PropTypes.string.isRequired

}
