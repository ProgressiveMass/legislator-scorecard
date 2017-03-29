import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import NavComponent from './NavComponent'
import Footer from './FooterComponent'

import LandingLayout from './landing/LandingPageComponent'
import ResultsLayout from './legislator/ResultsLayoutComponent'
import AllLegislatorsLayout from './all-legislators/AllLegislatorsLayout'

class App extends Component {

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <div className='d-flex flex-column'>
        <NavComponent />
        <div className='flex-grow'>
          <Switch>
            <Route path='/all-legislators' component={AllLegislatorsLayout} />
            <Route path='/my-legislators/:address' component={ResultsLayout} />
            <Route path='/' component={LandingLayout} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
