import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import InfoPopover from './../../general-components/InfoPopover'

import tagMap from './tagMap'

class ActsGrid extends React.Component {
  constructor (props) {
    super(props)
    this.renderCard = this.renderCard.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.filterRows = this.filterRows.bind(this)

    this.state = {
      tagFilter: ''
    }
  }

  renderCard (a, i) {
    const tags = a.tags.map(t => {
      return (
        <button
          className={`btn badge ${tagMap[t].badge} mr-2`}
          onClick={() => {
            this.toggleFilter(t)
          }}
          key={tagMap[t].name}
        >
          {tagMap[t].name}
        </button>
      )
    })

    return (
      <div
        key={a.actId}
        onClick={() => this.props.history.push(`/act/${a.actId}`)}
        className='card all-acts__card'
      >
        <div>
          {tags}
        </div>
        <h3 className='h5 mt-3 mb-1'>
          {a.shortTitle}
        </h3>
        <div className='font-weight-bold mb-1 text-muted'>
          {a.combinedNumber}&nbsp;
          {a.showPairedDisclaimer
            ? <InfoPopover text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill.' />
            : null}
        </div>
        <div className='mb-3' style={{ flexGrow: '1' }}>
          {a.senateDescription || a.houseDescription}
        </div>
        <div>
          <h3 style={{ fontSize: '1rem' }}>
            {a.totalCosponsors} Cosponsors (<Link to={`/act/${a.actId}`}>View All</Link>)
          </h3>
          <ul className='list-unstyled d-flex'>
            <li className='mr-2'>
              <span>House:&nbsp;</span>
              <span
                className='badge badge-default align-self-start'
                style={{ fontSize: '.9rem' }}
              >
                {a.houseCosponsors}
              </span>
            </li>
            <li>
              <span>Senate:&nbsp;</span>
              <span
                className='badge badge-default align-self-start'
                style={{ fontSize: '.9rem' }}
              >
                {a.senateCosponsors}
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  toggleFilter (t) {
    if (this.state.tagFilter === t) {
      this.setState({ tagFilter: '' })
    } else {
      this.setState({ tagFilter: t })
    }
  }

  renderTagFilters (tags) {
    return tags.map(t => {
      let badgeClass = 'badge-default'
      if (!this.state.tagFilter || this.state.tagFilter === t) {
        badgeClass = tagMap[t].badge
      }
      return (
        <li className='mr-1 my-2 my-md-0' key={tagMap[t].name}>
          <button
            className={`btn btn-sm badge ${badgeClass}`}
            style={{ fontSize: '.9rem' }}
            aria-pressed={this.state.tagFilter === t ? 'true' : 'false'}
            onClick={() => this.toggleFilter(t)}
          >
            {tagMap[t].name}
          </button>
        </li>
      )
    })
  }

  filterRows (data) {
    if (!this.state.tagFilter) {
      return data
    } else {
      return data.filter(d => {
        return d.tags.indexOf(this.state.tagFilter) > -1
      })
    }
  }

  render () {
    const acts = this.filterRows(this.props.data)
    const tags = [
      ...new Set([].concat.apply([], this.props.data.map(a => a.tags)))
    ]

    if (!acts) {
      return (
        <div>
          <p className='h3'>No Data Available</p>
        </div>
      )
    }

    return (
      <div className='grid-container'>
        <div className='metadata py-3 mb-2'>
          <h1 className='h2 mt-4'>
            Progressive Mass Legislative Agenda
          </h1>
          <div className='mb-4 font-weight-bold text-lg'>
            <a href='http://progressivemass.com/factsheet' target='_blank'>
              Read our detailed overview of current legislative
              initiatives.
            </a>
          </div>
          <div className='row no-gutters'>
            <div className='col-md-6 pr-md-5'>
              <p>
                This session, almost 6,000 pieces of legislation have been
                filed. Only a few will even make it out of committee, let alone
                receive a vote. Progressive Mass has identified a suite of
                bills, across several issue areas, to craft a{' '}
                <a href='http://progressivemass.com/factsheet' target='_blank'>
                  Progressive Legislative Agenda
                </a>.
              </p>
            </div>

            <div className='col-md-6 pr-md-5'>
              <p>
                Cosponsoring legislation is an important way for a legislator to
                help put momentum behind certain bills. It is one of the few
                signs we have for initial support. It&#8217;s not enough to push
                a bill through to passage&mdash;but it&#8217;s a first step.
                (Cosponsorship does not currently factor into a
                legislator&#8217;s score.)
              </p>
            </div>
          </div>

          <div className='mb-3 pt-3'>
            <span className='label d-md-inline-block mr-3'>
              Filter Bills By Topic:
            </span>
            <ul className='d-sm-inline-flex list-unstyled'>
              {this.renderTagFilters(tags)}
            </ul>
          </div>
        </div>

        <div className='d-flex flex-wrap all-acts__grid'>
          {acts.map((a, i) => {
            return this.renderCard(a, i)
          }, this)}
        </div>
      </div>
    )
  }
}

ActsGrid.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

export default withRouter(ActsGrid)
