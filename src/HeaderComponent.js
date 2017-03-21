import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (<header>
    <Link to='/' className='mt-3 mb-5 text-center'>
      <h1 className='h2'>
        <div className='font-weight-light h4'>Progressive Massachusetts </div>
        <span className='text-primary'>Legislator Report Card</span>
      </h1>
    </Link>

  </header>)
}

export default Header
