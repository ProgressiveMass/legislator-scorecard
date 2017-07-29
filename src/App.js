import React, { Component, PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavComponent from './general-components/NavComponent'
import Footer from './general-components/FooterComponent'

import LandingLayout from './routes/landing/LandingPageComponent'
import ResultsLayout from './routes/legislator/ResultsLayoutComponent'
import AllLegislatorsLayout from './routes/all-legislators/AllLegislatorsLayout'
import SingleLegislatorLayout from './routes/legislator/SingleLegislatorLayout'
import AllActsLayout from './routes/all-acts/AllActsLayout'

class App extends Component {

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <NavComponent />
        <main className='flex-grow'>
          <Switch>
            <Route path='/all-acts' component={AllActsLayout} />
            <Route path='/all-legislators' component={AllLegislatorsLayout} />
            <Route path='/my-legislators/:address' component={ResultsLayout} />
            <Route path='/legislator/:id' component={SingleLegislatorLayout} />
            <Route path='/' component={LandingLayout} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  location : PropTypes.object.isRequired
}

export default App
