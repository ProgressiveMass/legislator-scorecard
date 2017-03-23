import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (<header className='container-fluid'>
    <Link to='/' className='header__home-link'>
      <img src={require('./img/massachusetts-map-optimized.png')}
        aria-hidden
        className='header__home-link__background-img'
      />
      <h1>
        <div className='text-uppercase font-weight-light'
          style={{ fontSize: '1.3rem' }}
        >
          Progressive Massachusetts
        </div>
        <div
          className='h2 text-lowercase font-weight-bold mt-2'
          style={{ fontSize: '3rem', lineHeight: 0.9 }}
        >
            Legislator Report Card
        </div>
      </h1>
    </Link>

  </header>)
}

export default Header
