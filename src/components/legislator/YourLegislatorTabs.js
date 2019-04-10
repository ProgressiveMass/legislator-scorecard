import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import qs from 'query-string'

const YourLegislatorTabs = ({ currentLegislator }) => {
  const urlId = currentLegislator.replace('ocd-person/', '')

  const [search, setSearch] = useState({})

  useEffect(() => {
    const search = qs.parse(window.location.search)
    setSearch(search)
  }, [])

  const isPersonalizedView = search.yourSenator || search.yourRep
  if (!isPersonalizedView) return null

  const selectedClass = 'RRT__tab--selected'
  return (
    <div className="mt-5 d-md-flex your-legislator-tabs">
      <div
        className={`RRT__tab RRT__tab--first ${
          search.yourRep ? selectedClass : ''
        }`}
      >
        {search.yourRep ? (
          'Your Senator'
        ) : (
          <Link to={`/legislator/${search.yourSenator}?yourRep=${urlId}`}>
            Your Senator
          </Link>
        )}
      </div>
      <div className={`RRT__tab ${search.yourSenator ? selectedClass : ''}`}>
        {search.yourSenator ? (
          'Your Rep'
        ) : (
          <Link
            to={
              search.yourSenator
                ? '#'
                : `/legislator/${search.yourRep}?yourSenator=${urlId}`
            }
          >
            Your House Rep
          </Link>
        )}
      </div>
    </div>
  )
}

export default YourLegislatorTabs
