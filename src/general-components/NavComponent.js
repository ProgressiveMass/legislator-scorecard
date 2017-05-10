import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

const Header = (props) => {
  return (<header>
    <nav className='module-container py-3 d-md-flex justify-content-between align-items-center' aria-label='primary'>

      <Link to='/' className='header__home-link d-flex align-items-center'>
        <img src={require('./../img/logo.svg')}
          alt=''
          style={{ width: '35px', marginRight: '.7rem' }} />

        <span>
          <span className='text-uppercase h6 mb-0 d-block' style={{ fontWeight: 'normal' }}>Progressive Massachusetts</span>
          <span className='h4 mb-0 d-block'>Legislator Scorecard</span>
        </span>
      </Link>

      <div className='text-md-right mt-3 mt-md-0'>
        <ul className='list-unstyled d-flex'>
          <li className='mr-3 mr-md-5'>
            <NavLink to='/all-legislators'>View All <abbr aria-label='Massachusetts'>MA</abbr> Legislators</NavLink>
          </li>
          <li>
            <a href='https://gdoc.pub/doc/19eWMYZ3IZaT-YFqswn-LqGOnYzHMID7LXEj1Gn1GNu0' target='_blank'>F.A.Q. <span className='sr-only'>opens in new window</span></a>
          </li>
        </ul>

      </div>
    </nav>
  </header>)
}

export default withRouter(Header)
