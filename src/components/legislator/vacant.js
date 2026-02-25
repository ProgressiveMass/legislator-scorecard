import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../layout'
import YourLegislatorTabs from './YourLegislatorTabs'

const LegislatorPage = ({
  pageContext: {
    chamber,
    pageData,
  },
}) => {
  return (
    <Layout>
      <YourLegislatorTabs currentLegislator={pageData.legislator} />
      <div className='tinted-background'>
        <div className='module-container module-container--full-width-on-small'>
          <div className='metadata text-center' >
            <div className='label  heading-font' style={{ fontSize: '1.1rem' }}>
              {chamber === 'senate' ? 'Senator' : 'Representative'}
            </div>
            <h1 className='metadata__heading mt-1'>
              <span className='font-weight-normal'>This seat is currently vacant</span>
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

LegislatorPage.propTypes = {
  legislator: PropTypes.object.isRequired,
    chamber: PropTypes.string.isRequired,
}

export default LegislatorPage
