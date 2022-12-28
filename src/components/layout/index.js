import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
