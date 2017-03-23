import React, { PropTypes } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'

export default class CosponsorshipTable extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderCosponsorship (indicator) {
    if (!indicator) {
      return <span className='badge badge-clear'>N/A</span>
    } else if (indicator === 'Y') {
      return <span className='badge badge-primary'>Yes</span>
    } else if (indicator === 'N') {
      return <span className='badge badge-default'>No</span>
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
              ? <a href={this.createLink(c.number)} className='font-weight-bold'>
                {c.title}
              </a> : <span>{c.title}</span>
            }
          </div>
          <div>
            <span className='sr-only'>Topics:</span>
            {/* {c.platform ? <span className='badge badge-default mr-1'>
              <a href='https://d3n8a8pro7vhmx.cloudfront.net/progressivemass/pages/1011/attachments/original/1467977992/2016_06-30_Progressive_Platform_PDF.pdf?1467977992'
                target='_blank'
              >
                {c.platform}
              </a>
            </span> : null} */}
          </div>
        </td>
        <td style={{ width: '45%' }}>
          <p>
            {c.description}
          </p>
        </td>
        <td style={{ width: '15%' }}>
          {this.renderCosponsorship(c.yourLegislator)}
        </td>
      </tr>
    )
  }

  render () {
    return (
      <div className='table-container'>

        <StickyContainer>
          <div className='explanatory-text' >
            <p>
              Every legislative session, Progressive Massachusetts <a href='https://d3n8a8pro7vhmx.cloudfront.net/progressivemass/pages/1011/attachments/original/1467977992/2016_06-30_Progressive_Platform_PDF.pdf?1467977992' target='_blank'>
                chooses a selection of bills as legislative priorities.
              </a> Legislators who cosponsor these bills express an important symbolic measure of support.
            </p>

            <p><div className='label'>What you can do:</div>
              If {this.props.chamber === 'upper' ? 'Senator' : 'Representative'}&nbsp;{this.props.legislatorName} cosponsored an item of progressive legislation, you can thank him or her.
              If not, you can let him or her know which bills are important to you and why.
              <div>
                {/* <a href='' target='_blank'>Contact details for {this.props.legislatorName}</a> */}
              </div>
            </p>
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
              {this.props.data.map((c, i) => {
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
  chamber : PropTypes.string.isRequired
}
