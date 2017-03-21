import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './HeaderComponent'
import Footer from './FooterComponent'

import RepresentativeSearch from './search/RepresentativeSearchComponent'
import ResultsLayout from './results/ResultsLayoutComponent'
import ErrorPageComponent from './ErrorPageComponent'

class App extends Component {

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/my-legislators/:address' component={ResultsLayout} />
          <Route path='/error' component={ErrorPageComponent} />
          <Route path='/' component={RepresentativeSearch} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App
