import React, { PropTypes } from 'react'
import LegislatorMetadataComponent from './LegislatorMetadataComponent'
import LegislatorDataComponent from './LegislatorDataComponent'

export default class LegislatorPageComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      term : props.data[0].term
    }
  }

  render () {
    const data = this.props.data.filter((d) => {
      return d.term === this.state.term
    })[0]

    const dateTabs = this.props.data.map((d) => {
      return (<li className='nav-item'>
        <a href='#'
          className={`nav-link ${this.state.term === d.term ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); this.setState({ term: d.term }) }}
        >
          <div className='text-uppercase'>{d.term}</div>
        </a>
      </li>)
    })

    return (<div className='gray-background'>
      <LegislatorMetadataComponent data={this.props.legislator} />
      <ul className='nav nav-pills nav-justified'>
        { dateTabs }
      </ul>
      <LegislatorDataComponent data={data} chamber={this.props.chamber} />

    </div>)
  }
}

LegislatorPageComponent.propTypes = {
  legislator : PropTypes.object.isRequired,
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}
