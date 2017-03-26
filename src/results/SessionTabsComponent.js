import React, { PropTypes } from 'react'
import Tabs from 'react-responsive-tabs'
import TermLayout from './TermLayoutComponent'

export default class SessionTabsComponent extends React.Component {

  render () {
    const tabItems = this.props.data.map((d) => {
      return {
        title : d.term,
        getContent: () => {
          return <TermLayout
            id={d.term}
            data={d}
            chamber={this.props.chamber}
            legislatorName={this.props.legislatorName}
                 />
        }
      }
    })

    return (
      <div className='inverted-tabs'>
        <h2 className='sr-only'>Legislative Terms</h2>
        <Tabs items={tabItems}
          showMore={false}
          wrapperClass='inverted-tabs'
          transform={false}
        />
      </div>
    )
  }
}

SessionTabsComponent.propTypes = {
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}
