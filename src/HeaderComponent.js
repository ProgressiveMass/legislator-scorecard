import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Header = (props) => {
  const home = (props.location.pathname === '/')
  return (<header>
    <Link to='/' className={`header__home-link ${home ? 'header__home-link--centered-large' : ''}`}>
      <img src={require('./img/logo.png')}
        alt='Progressive Massachusetts Legislator Report Card'
        className='header__home-link__background-img'
      />
    </Link>

  </header>)
}

export default withRouter(Header)
