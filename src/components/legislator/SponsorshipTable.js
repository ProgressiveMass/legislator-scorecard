import React from 'react'
import PropTypes from 'prop-types'
import { StickyContainer, Sticky } from 'react-sticky'
import InfoPopover from '../InfoPopover'
import surveyImg from './images/survey.svg'
import getTagData from './tagMap'

export default class SponsorshipTable extends React.Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSummary = this.renderSummary.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.filterRows = this.filterRows.bind(this)

    this.state = {
      tagFilter: '',
    }
  }

  renderSummary() {
    const sponsoredLength = this.props.data.sponsorship.filter(
      c => c.yourLegislator === 'Y'
    ).length

    return (
      <p>
        This session, {this.props.lastName} cosponsored <b>{sponsoredLength}</b>{' '}
        out of the <b>{this.props.data.sponsorship.length}</b> bills endorsed by
        Progressive Massachusetts.
      </p>
    )
  }

  renderCosponsorship(indicator) {
    if (!indicator) {
      return <span className="badge badge-clear">N/A</span>
    } else if (indicator === 'Y') {
      return <span className="badge badge-primary">Yes</span>
    } else if (indicator === 'N') {
      return <span className="badge badge-danger">No</span>
    }
  }

  renderRow(c) {
    const tags = c.tags.map(t => {
      return (
        <button
          className={`btn badge ${getTagData(t).badge}`}
          onClick={() => {
            this.toggleFilter(t)
          }}
          key={getTagData(t).name}
        >
          {getTagData(t).name}
        </button>
      )
    })

    return (
      <tr key={c.finalNumber}>
        <td className="text-muted" style={{ width: '15%' }}>
          <div className="font-weight-bold">
            {c.bill_number}&nbsp;
            {c.showPairedDisclaimer ? (
              <InfoPopover text="This bill has two distinct versions in the House and Senate, but for the purposes of tracking sponsorship we treat them as a single bill." />
            ) : null}
          </div>

          <div>{tags}</div>
        </td>
        <td style={{ width: '30%' }}>
          <div>
            <a href={c.url} className="font-weight-bold" target="_blank">
              {c.shorthand_title}
            </a>
          </div>
        </td>
        <td style={{ width: '40%' }} data-label="">
          <p>{c.description}</p>
        </td>
        <td
          style={{ width: '15%' }}
          data-label={`${this.props.legislatorName} Cosponsored?`}
        >
          {this.renderCosponsorship(c.yourLegislator)}
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
        <li className="mr-1 my-2 my-md-0" key={getTagData(t).name}>
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
    // filtered based on selected tags (if any)
    const sponsorship = this.filterRows(this.props.data.sponsorship)

    if (!sponsorship) {
      return (
        <div className="my-5 py-5 text-center">
          <p className="h2 mb-5 pb-5">No Data Available</p>
        </div>
      )
    }

    const tags = Array.from(
      new Set(
        this.props.data.sponsorship
          .map(c => c.tags)
          .reduce((acc, curr) => acc.concat(curr), [])
      )
    ).sort()

    return (
      <div className="table-container">
        <h3 className="sr-only">Cosponsored Bills</h3>
        <StickyContainer>
          <div className="my-4 py-2">
            <p className="lead mb-0 readable-measure">
              Cosponsoring legislation is an important way for a legislator to
              help put momentum behind certain bills. To learn more about which
              bills Progressive Mass thinks are most important to support, you
              can view the{' '}
              <a
                className="font-weight-bold"
                target="_blank"
                href="https://d3n8a8pro7vhmx.cloudfront.net/progressivemass/pages/5393/attachments/original/1553983553/2019_PM_Fact_Sheet_Compilation_March_2019.pdf"
              >
                guide to progressive legislation for the 2019-2020 term.
              </a>
            </p>
          </div>

          <div className=" pt-3">
            <span className="label d-md-inline-block mr-3">
              Filter Bills By Topic:
            </span>
            <ul className="d-sm-inline-flex list-unstyled">
              {this.renderTagFilters(tags)}
            </ul>
          </div>

          <table className="table table--top-row-fixed">
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Bill</th>
                  <th style={{ width: '30%' }}>Title</th>
                  <th style={{ width: '40%' }}>
                    Summary from{' '}
                    <a href="http://www.progressivemass.com/" target="_blank">
                      Progressive Mass
                    </a>
                  </th>
                  <th style={{ width: '15%' }}>
                    {this.props.legislatorName} Cosponsored?
                  </th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {sponsorship.map((c, i) => {
                return this.renderRow(c, i)
              }, this)}
            </tbody>
          </table>
        </StickyContainer>
      </div>
    )
  }
}

SponsorshipTable.propTypes = {
  data: PropTypes.object.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
