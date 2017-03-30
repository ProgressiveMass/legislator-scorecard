import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Header = (props) => {
  return (<header>
    <div className='container d-md-flex justify-content-between align-items-center'>
      <Link to='/' className='header__home-link d-flex'>
        <div>
          <img src={require('./img/inspection.svg')}
            alt='logo image of an inspection sheet'
            style={{ width: '45px' }}
          />
        </div>
        <div>
          <div className='text-uppercase h6 mb-0' style={{ fontWeight: 'normal' }}>Progressive Massachusetts</div>
          <div className='h4'>Legislator Scorecard</div>
        </div>
      </Link>

      <nav className='text-md-right mt-3 mt-md-0'>

        <Link to='/all-legislators'>Index of All MA Legislators</Link>

      </nav>
    </div>
  </header>)
}

export default withRouter(Header)
