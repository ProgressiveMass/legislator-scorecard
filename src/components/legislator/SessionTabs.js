import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tabs from 'react-responsive-tabs'
import TermLayout from './TermLayout'
import ProgressBarWContext from '../progressBar'
import { getSessionNumber, QUERIES } from '../../utilities'

const Term = styled.div`
  @media ${QUERIES.tabletAndSmaller} {
    font-size: 1rem;
    text-wrap: wrap;
  }
`

const Session = styled.div`
  font-size: 1rem;

  @media ${QUERIES.tabletAndSmaller} {
    font-size: 0.8rem;
    text-wrap: wrap;
  }
`

export const SessionTabs = ({ terms, chamber, familyName }) => {
  const tabItems = terms.map((d) => {
    const sessionNumber = getSessionNumber(d.term)
    return {
      title: (
        <div>
          <Term>{d.term} </Term>
          <Session>{sessionNumber} Session</Session>
          <div
            style={{
              marginLeft: '8%',
              marginRight: '8%',
              marginTop: '7px',
            }}>
            <ProgressBarWContext data={d} utilizeGradeOnlyFlag={true}/>
          </div>
        </div>
      ),
      key: d.term,
      getContent: () => {
        return (
          <TermLayout
            id={d.term}
            data={d}
            chamber={chamber}
            familyName={familyName}
          />
        )
      },
    }
  })

  const selectedTabKey = terms[terms.length - 1].term

  return (
    <div className='inverted-tabs'>
      <h2 className='sr-only'>Legislative Terms</h2>
      <Tabs
        items={tabItems}
        showMore={false}
        wrapperClass='inverted-tabs'
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
  familyName: PropTypes.string.isRequired,
}
