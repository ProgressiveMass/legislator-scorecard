import React, { PropTypes } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

import ProgressComponent from './ProgressComponent'


export default class VoteTableComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSenatorVote = this.renderSenatorVote.bind(this)
  }

  renderSenatorVote (v) {
    if (v === 'n/a') {
      return <span className='badge badge-default'>N/A</span>
    } else if (v === '-') {
      return <span className='badge badge-danger'>No</span>
    } else if (v === '+') {
      return <span className='badge badge-success'>Yes</span>
    } else if (v === 'NV') {
      return <span className='badge badge-default'>Didn't vote</span>
    }
  }

  renderRow (v) {
    return (
      <tr key={v.id}>
        <td>
          <a href={v.url} target='_blank'>
            {v.title}
            <div>
              <span className='sr-only'>Topics:</span>
              {v.tags ? v.tags.split(',').map((t) => {
                return <span className='badge badge-default'>{t}</span>
              }) : null}
            </div>
          </a>
        </td>
        <td>
          <p>
            {v.description}
          </p>
          <p><span className='label'>Progressive Position:</span>&nbsp;{
            v.progressivePosition === 'Yes' ? <span className='badge badge-success'>Vote Yes</span>
            : <span className='badge badge-danger'>Vote No</span>
          }</p>
        </td>
        <td>
          {this.renderSenatorVote(v.senatorVote)}
        </td>
        <td>
          <div>
            <span className='label votes-fw'>Yes:</span>&nbsp;
            <span className='badge badge-success'>
              {v.yesVotes}
            </span>
          </div>
          <div>
            <span className='label votes-fw'>No:</span>&nbsp;
            <span className='badge badge-danger'>{v.noVotes}</span>
          </div>
        </td>
      </tr>
    )
  }

  render () {
    if (!this.props.votes) return null

    return (
      <StickyContainer>
        <div className='white-floated table-container'>
          <ProgressComponent
            votes={this.props.votes}
            voteSummary={this.props.voteSummary}
            lastName={this.props.lastName}
            voteRating={this.props.voteRating}
          />
          <table className='table table-responsive'>
            <caption>2015-16 Senate Votes (189th Session)</caption>
            <Sticky>
              <thead>
                <tr>
                  <th style={{width: '28%'}}>Bill</th>
                  <th>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachussetts</a></th>
                  <th>Senator's Vote</th>
                  <th>Vote Tally</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {this.props.votes.map((v) => {
                return this.renderRow(v)
              }, this)}
            </tbody>

          </table>
        </div>
      </StickyContainer>

        )
  }
}

VoteTableComponent.propTypes = {
}
