import React from 'react'
import Tabs from 'react-responsive-tabs'

import legislatorMetadata from './legislator-data.json'
import LegislatorListComponent from './LegislatorListComponent'

export default class AllLegislators extends React.Component {

  render () {
    const tabItems = [
      {
        title : 'All MA House Reps',
        component : (<LegislatorListComponent
          data={legislatorMetadata.houseReps}
          chamber='lower' />)
      },
      {
        title : 'All MA Senators',
        component : (<LegislatorListComponent
          data={legislatorMetadata.senators}
          chamber='upper' />)
      }
    ]
      .map((t) => {
        return {
          title: t.title,
          getContent: () => t.component
        }
      })

    return (
      <div className='tinted-background'>
        <h1 className='text-center h2 mt-3' style={{ marginBottom: '2rem' }}>
          Index of Current MA Legislators
        </h1>
        <div className='mt-4 inverted-tabs'>
          <Tabs items={tabItems}
            showMore={false}
            transform={false}
          />
        </div>
      </div>

    )
  }
}
