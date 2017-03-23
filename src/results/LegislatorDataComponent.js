import React, { PropTypes } from 'react'

import CosponsorshipTable from './CosponsorshipTableComponent'
import VoteTable from './VoteTableComponent'

const getKey = (tab) => {
  return tab.term + tab.type
}

export default class LegislatorDataComponent extends React.Component {
  constructor (props) {
    super(props)

    const tabs = []

    props.data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key === 'cosponsorship' || key === 'votes') {
          tabs.push({ term : d.term, type : key, data : d[key] })
        }
      })
    })

    const tabsWithData = tabs.filter((t) => t.data && t.data.length > 0)

    this.state = {
      tabs : tabs,
      activeTab : getKey(tabsWithData[0])
    }
  }

  render () {
    const tabs = this.state.tabs.map((t) => {
      const key = getKey(t)
      return (<li className='nav-item'>
        <a href='#'
          className={`nav-link ${this.state.activeTab === key ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); this.setState({ activeTab : key }) }}
        >
          <div className='text-uppercase'>
            <div className='font-weight-light'>{t.term}</div>
            <b>{t.type}</b>
          </div>
        </a>
      </li>)
    })

    const active = this.state.tabs.filter((t) => {
      return getKey(t) === this.state.activeTab
    })[0]

    let BodyComponent

    if (active.type === 'votes') {
      BodyComponent = VoteTable
    } else if (active.type === 'cosponsorship') {
      BodyComponent = CosponsorshipTable
    }

    return (<div
      style={{ maxWidth: '1200px', margin: 'auto' }}
            >
      <ul className='nav nav-tabs nav-justified'>
        { tabs }
      </ul>
      <BodyComponent data={active.data}
        chamber={this.props.chamber}
        legislatorName={this.props.legislatorName}
      />
    </div>)
  }
}

LegislatorDataComponent.propTypes = {
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}
