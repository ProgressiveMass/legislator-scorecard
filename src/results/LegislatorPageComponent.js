import React, { PropTypes } from 'react'
import LegislatorMetadataComponent from './LegislatorMetadataComponent'
import SessionTabsComponent from './SessionTabsComponent'

export default class LegislatorPageComponent extends React.Component {

  render () {
    return (<div className='tinted-background'>
      <LegislatorMetadataComponent
        data={this.props.legislator}
        chamber={this.props.chamber}
        rating={this.props.rating}
        legislatorName={this.props.legislator.last_name}
      />
      <SessionTabsComponent
        data={this.props.data.data}
        chamber={this.props.chamber}
        legislatorName={this.props.legislator.last_name}
        key={this.props.chamber}
      />

    </div>)
  }
}

LegislatorPageComponent.propTypes = {
  legislator : PropTypes.object.isRequired,
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}
