import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'

import App from './App'
import RepresentativeSearch from './search/RepresentativeSearchComponent'
import ResultsLayout from './results/ResultsLayoutComponent'
import ErrorPageComponent from './ErrorPageComponent'

import './scss/manifest.scss'

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: RepresentativeSearch },
  childRoutes: [
    { path: 'senator', component: ResultsLayout },
    { path: 'error', component: ErrorPageComponent }

  ]
}

ReactDOM.render(
  <Router routes={routes} history={hashHistory} />,
  document.getElementById('root')
)
