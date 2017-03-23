import React from 'react'
import SearchFormComponent from './SearchFormComponent'

export default class RepresentativeSearch extends React.Component {

  render () {
    return (<div className='search-page'>
      <main className='gray-background'>
        <SearchFormComponent />
      </main>
    </div>)
  }
}
