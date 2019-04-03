import React from 'react'
import PropTypes from 'prop-types'
import SEO from '../seo'
import LegislatorMetadata from './LegislatorMetadata'
import SessionTabs from './SessionTabs'
import Layout from '../layout'

const LegislatorPage = ({
  pageContext: { chamber, id, pageData },
}) => {
  const legislatorTitle = chamber === 'senate' ? 'Senator' : 'Rep'
  const seoTitle = `${legislatorTitle} ${pageData.legislator.name}'s Voting Record`
  const seoDescription = `Learn about ${legislatorTitle} ${pageData.legislator.name}'s values by viewing a record of their activity in the Massachusetts statehouse.`
  return (
    <Layout>
    <SEO title={seoTitle} description={seoDescription} />
      <div className="tinted-background">
        <LegislatorMetadata
          data={pageData.legislator}
          chamber={chamber}
          rating={pageData.rating}
        />
        <SessionTabs
          terms={pageData.data}
          chamber={chamber}
          legislatorName={pageData.legislator.name}
          key={chamber}
        />
      </div>
    </Layout>
  )
}

LegislatorPage.propTypes = {
  legislator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
}

export default LegislatorPage
