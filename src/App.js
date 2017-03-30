import React, { Component, PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'

import NavComponent from './NavComponent'
import Footer from './FooterComponent'

import LandingLayout from './routes/landing/LandingPageComponent'
import ResultsLayout from './routes/legislator/ResultsLayoutComponent'
import AllLegislatorsLayout from './routes/all-legislators/AllLegislatorsLayout'
import SingleLegislatorLayout from './routes/legislator/SingleLegislatorLayout'

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
            <Route path='/legislator/:id' component={SingleLegislatorLayout} />
            <Route path='/' component={LandingLayout} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  location : PropTypes.object.isRequired
}

export default App
