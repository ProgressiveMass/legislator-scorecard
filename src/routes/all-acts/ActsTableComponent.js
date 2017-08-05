import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { StickyContainer, Sticky } from 'react-sticky'
import InfoPopover from './../../general-components/InfoPopover'

import tagMap from './tagMap'

class ActsTable extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.filterRows = this.filterRows.bind(this)

    this.state = {
      tagFilter : ''
    }
  }

  renderNumCosponsorships (numCosponsors) {
    if (numCosponsors < 100) {
      return <span className='badge badge-danger'>{numCosponsors}</span>
    } else {
      return <span className='badge badge-primary'>{numCosponsors}</span>
    }
  }

  renderRow (a, i) {
    const tags = a.tags.map((t) => {
      return <button
        className={`btn badge ${tagMap[t].badge}`}
        onClick={() => { this.toggleFilter(t) }}
        key={tagMap[t].name}
             >
        {tagMap[t].name}
      </button>
    })

    return (
      <tr key={a.actId} >
        <td className='text-muted' style={{ width: '15%' }}>
          <div className='font-weight-bold'>
            {a.combinedNumber}&nbsp;
            {a.showPairedDisclaimer
              ? <InfoPopover
                text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill.'
                /> : null}
          </div>

          <div>
            { tags }
          </div>
        </td>
        <td
          onClick={e => {
            e.preventDefault()
            this.props.history.push(`/act/${a.actId}`)
          }}
          style={{ width: '30%' }}
        >
          <p>
            {a.houseTitle || a.senateTitle}
          </p>
        </td>
        <td
          onClick={e => {
            e.preventDefault()
            this.props.history.push(`/act/${a.actId}`)
          }}
          style={{ width: '40%' }}
          data-label=''
        >
          <p>
            {a.houseDescription || a.senateDescription}
          </p>
        </td>
        <td style={{ width: '15%' }} data-label=''>
          {this.renderNumCosponsorships(a.numCosponsors)}
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
      return <li className='mr-1 my-2 my-md-0' key={tagMap[t].name}>
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
    const acts = this.filterRows(this.props.data)
    const tags = [...(new Set([].concat.apply([], this.props.data.map((a) => a.tags))))]

    if (!acts) {
      return <div>
        <p className='h-3'>No Data Available</p>
      </div>
    }

    return (
      <div className='table-container'>
        <h3 className='sr-only'>Cosponsored Bills</h3>
        <StickyContainer>
          <div className='row no-gutters explanatory-text'>
            <div className='text-center py-3' style={{ width: '100%', fontSize : '1.1rem', background : 'rgba(2, 117, 216, 0.1)' }}>
              <a className='font-weight-bold heading-font' target='_blank'
                href='http://progressivemass.com/factsheet'>
                <img
                  src={require('./../../img/survey.svg')}
                  alt='list symbol' style={{ width: '45px' }}
                  className='d-block d-sm-inline-block mx-auto'
                />
                View our guide to progressive legislation for the 2017-2018 term.
              </a>
            </div>
            <div className='col-md-6 p-3 pr-md-5'>
              <p>
                This session, almost 6,000 pieces of legislation have been filed. Only a few will even make it out of committee, let alone receive a vote. Progressive Mass has identified a suite of bills, across several issue areas, to craft a <a href='http://www.progressivemass.com/190legislativeagenda' target='_blank' >Progressive Legislative Agenda</a>.
              </p>

            </div>

            <div className='col-md-6 p-3 pr-md-5'>
              <p>
                Cosponsoring legislation is an important way for a legislator to help put momentum behind certain bills. It is one of the few signs we have for initial support.
                It’s not enough to push a bill through to passage&mdash;but it’s a first step. (Cosponsorship does not currently factor into a legislator's score.)
              </p>
            </div>

          </div>

          <div className='mb-3 pt-4'>
            <span className='label d-md-inline-block mr-3'>Filter Bills By Topic:</span>
            <ul className='d-sm-inline-flex list-unstyled'>
              { this.renderTagFilters(tags) }
            </ul>
          </div>

          <table className='table table-hover table--top-row-fixed'>
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Bill</th>
                  <th style={{ width: '30%' }}>Title</th>
                  <th style={{ width: '40%' }}>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Mass</a></th>
                  <th style={{ width: '15%' }}>Cosponsors</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {acts.map((a, i) => {
                return this.renderRow(a, i)
              }, this)}
            </tbody>

          </table>
        </StickyContainer>
      </div>

    )
  }
}

ActsTable.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

export default withRouter(ActsTable)
