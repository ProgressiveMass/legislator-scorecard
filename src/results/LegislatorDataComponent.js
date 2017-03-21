import React, { PropTypes } from 'react'

import CosponsorshipTable from './CosponsorshipTableComponent'
import VoteTable from './VoteTableComponent'

export default class LegislatorDataComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab : props.data.votes ? 'votes' : 'cosponsorship'
    }
  }

  render () {
    const tabsToShow = ['votes']
    if (this.props.data.cosponsorship) {
      tabsToShow.unshift('cosponsorship')
    }
    const tabs = tabsToShow.map((d) => {
      return (<li className='nav-item'>
        <a href='#'
          className={`nav-link ${this.state.activeTab === d ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); this.setState({ activeTab : d }) }}
        >
          <div className='text-uppercase'>{d}</div>
        </a>
      </li>)
    })

    let BodyComponent, bodyData

    if (this.state.activeTab === 'votes') {
      BodyComponent = VoteTable
      bodyData = this.props.data.votes
    } else if (this.state.activeTab === 'cosponsorship') {
      BodyComponent = CosponsorshipTable
      bodyData = this.props.data.cosponsorship
    }

    return (<div key={this.props.chamber}>
      <ul className='nav nav-tabs nav-justified'>
        { tabs }
      </ul>
      <BodyComponent data={bodyData} chamber={this.props.chamber} />
    </div>)
  }
}

LegislatorDataComponent.propTypes = {
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}
