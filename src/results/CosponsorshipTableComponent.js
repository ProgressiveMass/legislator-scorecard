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

  renderRow (c, i) {
    return (
      <tr key={i}>
        <td style={{ width: '35%' }}>
          <div className='label mb-1'>
            {c.number}
          </div>
          <div>
            {c.title}
          </div>
        </td>
        <td style={{ width: '55%' }}>
          <p>
            {c.description}
          </p>
        </td>
        <td style={{ width: '10%' }}>
          {this.renderCosponsorship(c.yourLegislator)}
        </td>
      </tr>
    )
  }

  render () {
    return (
      <StickyContainer>
        <div className='table-container'>

          <table className='table table-responsive'>
            <Sticky>
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Bill</th>
                  <th style={{ width: '55%' }}>Summary from <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachussetts</a></th>
                  <th style={{ width: '10%' }}>Legislator Cosponsored?</th>
                </tr>
              </thead>
            </Sticky>
            <tbody>
              {this.props.data.map((c, i) => {
                return this.renderRow(c, i)
              }, this)}
            </tbody>

          </table>
        </div>
      </StickyContainer>

    )
  }
}

CosponsorshipTable.propTypes = {
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}
