import React from 'react'
import { Link } from 'gatsby'
const SearchInstructions = () => {
  return (
    <div className='search-instructions mt-5 mb-4 my-md-0 white-background'>
      <h2>Check On Your Legislators:</h2>
      <ol className=' '>
      <li>
      <a
        href='https://malegislature.gov/Search/FindMyLegislator'
        target='__blank'>
          Look up who your legislators are
      </a>
      </li>
      <li>
      <Link
        to='/all-legislators'>
          Pull up their scorecards
      </Link>
      </li>
      </ol>
    </div>
  )
}

export default SearchInstructions