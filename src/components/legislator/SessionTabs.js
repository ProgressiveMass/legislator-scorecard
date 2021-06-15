import React from 'react'
import PropTypes from 'prop-types'
import Tabs from 'react-responsive-tabs'
import TermLayout from './TermLayout'

const termDict = {
  '2015-2016': '189th Session',
  '2017-2018': '190th Session',
  '2019-2020': '191st Session',
  '2021-2022': '192nd Session',
}

export const SessionTabs = ({ terms, chamber, lastName }) => {
  const tabItems = terms.map((d, i) => {
    return {
      title: (
        <div>
          <div>{d.term} </div>
          <div style={{ fontSize: '1rem' }}>{termDict[d.term]}</div>
        </div>
      ),
      key: d.term,
      getContent: () => {
        return (
          <TermLayout
            id={d.term}
            data={d}
            chamber={chamber}
            lastName={lastName}
          />
        )
      },
    }
  })

  const selectedTabKey = terms[terms.length - 1].term

  return (
    <div className="inverted-tabs">
      <h2 className="sr-only">Legislative Terms</h2>
      <Tabs
        items={tabItems}
        showMore={false}
        wrapperClass="inverted-tabs"
        transform={false}
        selectedTabKey={selectedTabKey}
      />
    </div>
  )
}

export default SessionTabs

SessionTabs.propTypes = {
  terms: PropTypes.array.isRequired,
  chamber: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}
