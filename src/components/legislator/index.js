import React from "react"
import PropTypes from "prop-types"
import LegislatorMetadataComponent from "./LegislatorMetadataComponent"
import SessionTabsComponent from "./SessionTabsComponent"
import Layout from "../layout"

const LegislatorPageComponent = ({
  pageContext: { chamber, id, legislatorMetadata },
}) => {
  debugger // eslint-disable-line
  return (
    <Layout>
      <div className="tinted-background">
        <LegislatorMetadataComponent
          data={legislatorMetadata.legislator}
          chamber={chamber}
          rating={"100" }
          legislatorName={legislatorMetadata.legislator.name}
        />
        <SessionTabsComponent
          data={legislatorMetadata}
          chamber={chamber}
          legislatorName={legislatorMetadata.legislator.name}
          key={chamber}
        />
      </div>
    </Layout>
  )
}

LegislatorPageComponent.propTypes = {
  legislator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
}

export default LegislatorPageComponent
