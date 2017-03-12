import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (<header>
    <Link to='/' className='mt-5 mb-5 text-center'>
      <h1>
        How <span className='text-primary'>Progressive</span> is your MA State Senator?
      </h1>
    </Link>

  </header>)
}

export default Header
