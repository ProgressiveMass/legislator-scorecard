import React, { Component } from 'react'

import Header from './HeaderComponent'
import Footer from './FooterComponent'

class App extends Component {
  render () {
    return (
      <div className='container'>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

export default App
