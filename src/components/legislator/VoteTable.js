import React from 'react'
import PropTypes from 'prop-types'
import { StickyContainer, Sticky } from 'react-sticky'
import getTagData from './tagMap'

export default class VoteTable extends React.Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.filterRows = this.filterRows.bind(this)

    this.state = {
      tagFilter: '',
    }
  }

  renderLegislatorVote(v, progressive_position) {
    let badgeClass = 'badge'

    const oppositeDict = position => {
      if (position.toLowerCase() === 'yes') return 'No'
      else if (position.toLowerCase() === 'no') return 'Yes'
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
      badgeText =
        progressive_position[0].toUpperCase() +
        progressive_position.slice(1).toLowerCase()
    } else if (v === '-') {
      badgeText = oppositeDict(progressive_position)
    } else if (v === 'NV') {
      badgeText = 'No vote'
    } else if (v === 'NVP') {
      badgeText = 'Abstained'
    }

    return <span className={badgeClass}>{badgeText}</span>
  }

  renderCumulativeVote(yesVotes, noVotes, progressive_position) {
    const yesBlock = (
      <div>
        <span className="label votes-fw">Yes:</span>&nbsp;
        <span
          className={`badge ${
            progressive_position.toLowerCase() === 'yes'
              ? 'badge-primary'
              : 'badge-danger'
          }`}
        >
          {yesVotes}
        </span>
      </div>
    )

    const noBlock = (
      <div>
        <span className="label votes-fw">No:</span>&nbsp;
        <span
          className={`badge ${
            progressive_position.toLowerCase() === 'no'
              ? 'badge-primary'
              : 'badge-danger'
          }`}
        >
          {noVotes}
        </span>
      </div>
    )

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

  renderRow(v, i) {
    const tags = v.tags.map(t => {
      return (
        <button
          key={getTagData(t).name}
          className={`btn badge ${getTagData(t).badge}`}
          onClick={() => {
            this.toggleFilter(t)
          }}
        >
          {getTagData(t).name}
        </button>
      )
    })

    return (
      <tr key={i}>
        <td style={{ width: '15%' }}>
          <div className="text-muted font-weight-bold">
            <a href={v.rollCallUrl} target="_blank" className="muted-link">
              {v.number}
            </a>
          </div>
          <div>{tags}</div>
        </td>
        <td style={{ width: '25%' }}>
          <a href={v.url} target="_blank" className="font-weight-bold">
            {v.title}
            <div />
          </a>
        </td>
        <td style={{ width: '35%' }}>
          <p>{v.description}</p>
          <p>
            <span className="label">Progressive Position:</span>&nbsp;
            <span className="badge badge-primary">
              {v.progressive_position}
            </span>
          </p>
        </td>
        <td
          style={{ width: '12.5%' }}
          data-label={`${this.props.lastName}'s Vote`}
        >
          {this.renderLegislatorVote(v.yourLegislator, v.progressive_position)}
        </td>
        <td style={{ width: '12.5%' }} data-label="Total Votes">
          {this.renderCumulativeVote(
            v.yesVotes,
            v.noVotes,
            v.progressive_position
          )}
        </td>
      </tr>
    )
  }

  toggleFilter(t) {
    if (this.state.tagFilter === t) {
      this.setState({ tagFilter: '' })
    } else {
      this.setState({ tagFilter: t })
    }
  }

  renderTagFilters(tags) {
    return tags.map(t => {
      let badgeClass = 'badge-light'
      if (!this.state.tagFilter || this.state.tagFilter === t) {
        badgeClass = getTagData(t).badge
      }
      return (
        <li className="mr-1" key={getTagData(t).name}>
          <button
            className={`btn btn-sm badge ${badgeClass}`}
            style={{ fontSize: '.9rem' }}
            aria-pressed={this.state.tagFilter === t ? 'true' : 'false'}
            onClick={() => this.toggleFilter(t)}
          >
            {getTagData(t).name}
          </button>
        </li>
      )
    })
  }

  filterRows(data) {
    if (!this.state.tagFilter) {
      return data
    } else {
      return data.filter(d => {
        return d.tags.indexOf(this.state.tagFilter) > -1
      })
    }
  }

  render() {
    const votes = this.filterRows(this.props.data.votes)
    const tags = Array.from(
      new Set(
        this.props.data.votes
          .map(c => c.tags)
          .reduce((acc, curr) => acc.concat(curr), [])
      )
    )

    if (!votes || votes.length === 0) {
      return (
        <div className="table-container text-center">
          <div className=" mx-auto p-5">
            <b>No data available.</b>
          </div>
        </div>
      )
    }
    return (
      <div className="table-container">
        <h3 className="sr-only">Voting Record</h3>
        <div className="my-4 py-2 lead">
          <p>
            Legislators are scored for their roll-called votes on bills and
            amendments where an important progressive advancement (or stopping a
            bad policy) is at stake.{' '}
            <a
              href="https://gdoc.pub/doc/19eWMYZ3IZaT-YFqswn-LqGOnYzHMID7LXEj1Gn1GNu0"
              target="_blank"
            >
              Learn more about the benefits and limitations of a scorecard.
            </a>
          </p>
        </div>

        <div className="mb-2">
          <span className="label d-md-inline-block mr-3">
            Filter Bills By Topic:
          </span>
          <ul className="d-sm-inline-flex list-unstyled">
            {this.renderTagFilters(tags)}
          </ul>
        </div>

        <StickyContainer>
          <table className="table table--top-row-fixed">
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Bill</th>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '35%' }}>
                    Summary from{' '}
                    <a
                      href="https://www.progressivemass.com/190thscorecard-house"
                      target="_blank"
                    >
                      Progressive Mass
                    </a>
                  </th>
                  <th style={{ width: '12.5%' }}>
                    {this.props.lastName}'s Vote
                  </th>
                  <th style={{ width: '12.5%' }}>Vote Tally</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {votes.map((v, i) => {
                return this.renderRow(v, i)
              }, this)}
            </tbody>
          </table>
        </StickyContainer>
      </div>
    )
  }
}

VoteTable.propTypes = {
  data: PropTypes.object.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
