import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'

import App from './App'
import RepresentativeSearch from './search/RepresentativeSearchComponent.js'
import ResultsLayout from './results/ResultsLayoutComponent.js'

import './scss/manifest.scss'

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: RepresentativeSearch },
  childRoutes: [
    { path: 'senator', component: ResultsLayout }
  ]
}

ReactDOM.render(
  <Router routes={routes} history={hashHistory} />,
  document.getElementById('root')
)
