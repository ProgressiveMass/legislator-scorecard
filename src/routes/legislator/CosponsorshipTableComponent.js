import React, { PropTypes } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

export default class CosponsorshipTable extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderSummary = this.renderSummary.bind(this)
  }

  renderSummary () {
    const sponsoredLength = this
    .props
    .data
    .cosponsorship
    .filter((c) => c.yourLegislator === 'Y')
    .length

    return (
      <p>
        This session, {this.props.legislatorName} cosponsored <b>{sponsoredLength}</b> out of the <b>{this.props.data.cosponsorship.length}</b> bills endorsed by Progressive Massachusetts.
      </p>
    )
  }

  renderCosponsorship (indicator) {
    if (!indicator) {
      return <span className='badge badge-clear'>N/A</span>
    } else if (indicator === 'Y') {
      return <span className='badge badge-primary'>Yes</span>
    } else if (indicator === 'N') {
      return <span className='badge badge-danger'>No</span>
    }
  }

  createLink (billNumber) {
    const linkBase = 'https://malegislature.gov/Bills/190/'
    if (billNumber.match(/S\s*D\s*.*/)) {
      return linkBase + billNumber.match(/S\s*D\s*.*/)[0].replace(' ', '')
    } else if (billNumber.match(/H\s*D\s*.*/)) {
      return linkBase + billNumber.match(/H\s*D\s*.*/)[0].replace(' ', '')
    } else {
      return null
    }
  }

  renderRow (c, i) {
    return (
      <tr key={i}>
        <td style={{ width: '40%' }}>
          <div>
            {this.createLink(c.number)
              ? <a href={this.createLink(c.number)} className='font-weight-bold' target='_blank'>
                <div className='text-muted'>{c.number}</div>
                {c.title}
              </a> : <span>{c.title}</span>
            }
          </div>
          <div>
            {/* {c.platform ? <span className='badge badge-default mr-1'>
              <a href='https://d3n8a8pro7vhmx.cloudfront.net/progressivemass/pages/1011/attachments/original/1467977992/2016_06-30_Progressive_Platform_PDF.pdf?1467977992'
                target='_blank'
              >
                {c.platform}
              </a>
            </span> : null} */}
          </div>
        </td>
        <td style={{ width: '45%' }} data-label=''>
          <p>
            {c.description}
          </p>
        </td>
        <td style={{ width: '15%' }} data-label={`${this.props.legislatorName} Cosponsored?`}>
          {this.renderCosponsorship(c.yourLegislator)}
        </td>
      </tr>
    )
  }

  render () {
    const cosponsorship = this.props.data.cosponsorship

    if (!cosponsorship) {
      return <div>
        <p className='h-3'>No Data Available</p>
      </div>
    }

    return (
      <div className='table-container table--top-row-fixed'>
        <h4 className='sr-only'>Cosponsorship Record</h4>
        <StickyContainer>
          <div className='row no-gutters explanatory-text'>
            <div className='col-md-6 pr-3'>
              <p>
                This session, almost 6,000 pieces of legislation have been filed. Only a few will even make it out of committee, let alone receive a vote.
                Progressive Mass identifies a suite of bills, in several issue areas, to craft a Progressive Legislative Agenda. These are the bills that can make the most dramatic changes in real people’s lives.
              </p>
            </div>

            <div className='col-md-6 pr-3'>
              <p>
                Cosponsoring legislation is one of the ways that a Legislator can help put momentum behind certain bills: consponsorship is one of the few signs we have for initial support. <br />
                It’s not enough to push a bill through to passage&mdash;but it’s a first step.
              </p>
            </div>
          </div>

          <table className='table table-responsive'>
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Bill</th>
                  <th style={{ width: '45%' }}>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachusetts</a></th>
                  <th style={{ width: '15%' }}>{this.props.legislatorName} Cosponsored?</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {cosponsorship.map((c, i) => {
                return this.renderRow(c, i)
              }, this)}
            </tbody>

          </table>
        </StickyContainer>
      </div>

    )
  }
}

CosponsorshipTable.propTypes = {
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired,
  legislatorName : PropTypes.string.isRequired
}
