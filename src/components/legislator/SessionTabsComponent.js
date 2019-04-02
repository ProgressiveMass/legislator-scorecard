import React from "react"
import PropTypes from "prop-types"
import Tabs from "react-responsive-tabs"
import TermLayout from "./TermLayoutComponent"

const termDict = {
  "2015-2016": "189th Session",
  "2017-2018": "190th Session",
}

export const SessionTabsComponent = () => {
  const tabItems = this.props.data.map(d => {
    return {
      title: (
        <div>
          <div>{d.term}</div>
          <div style={{ fontSize: "1rem" }}>{termDict[d.term]}</div>
        </div>
      ),
      key: d.term,
      getContent: () => {
        return (
          <TermLayout
            id={d.term}
            data={d}
            chamber={this.props.chamber}
            legislatorName={this.props.legislatorName}
          />
        )
      },
    }
  })

  const selectedTabKey = this.props.data[this.props.data.length - 1].term

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

export default SessionTabsComponent

SessionTabsComponent.propTypes = {
  data: PropTypes.array.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
