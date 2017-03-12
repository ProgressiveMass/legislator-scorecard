import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import SearchFormComponent from './SearchFormComponent'
import SearchMapComponent from './SearchMapComponent'

export default class RepresentativeSearch extends React.Component {

  render () {
    return (<div className='search-page'>
      <nav>
        <ul className='nav nav-pills nav-fill'>
          <li className='nav-item'>
            <NavLink
              exact
              to='/'
              className='nav-link'>
              <i className='fa fa-home' aria-hidden />&nbsp;Address Search
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              to='/map'
              className='nav-link'>
              <i className='fa fa-map-marker' />&nbsp;Map Search
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route exact path='/' component={SearchFormComponent} />
          <Route path='/map' component={SearchMapComponent} />
        </Switch>
      </main>

    </div>)
  }
}
