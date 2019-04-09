import React, { useState, useEffect } from 'react'
import qs from 'query-string'

const YourLegislatorTabs = () => {
  const [search, setSearch] = useState({})

  useEffect(() => {
    const search = qs.parse(window.location.search)
    setSearch(search)
  }, [])

  const isPersonalizedView = search.yourSenator || search.yourRep
  if (!isPersonalizedView) return null
  
  const selectedClass = 'RRT__tab--selected'
  return (
    <div className="mt-5 d-md-flex">
      <div
        className={`RRT__tab RRT__tab--first ${
          search.yourRep ? selectedClass : ''
        }?yourSenator=${search.yourSenator}`}
      >
        <a
          href={
            search.yourRep
              ? '#'
              : `/legislator/${search.yourSenator.replace(
                  'ocd-person/',
                  ''
                )}?yourRep=${search.yourRep}`
          }
        >
          Your Senator
        </a>
      </div>
      <div className={`RRT__tab ${search.yourSenator ? selectedClass : ''}`}>
        <a
          href={
            search.yourSenator
              ? '#'
              : `/legislator/${search.yourRep.replace('ocd-person/', '')}`
          }
        >
          Your House Rep
        </a>
      </div>
    </div>
  )
}

export default YourLegislatorTabs
