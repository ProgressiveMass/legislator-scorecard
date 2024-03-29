import React from 'react'
import { Link } from 'gatsby'
import LogoImg from '../../images/scorecard-logo.png'
import styled from 'styled-components'
import { QUERIES } from '../../utilities'

const MobileFriendlyList = styled.ul`
  @media ${QUERIES.phoneAndSmaller} {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
  }
`
const Nav = () => {
  return (
    <header>
      <nav
        className='module-container py-3 d-md-flex justify-content-between align-items-center'
        aria-label='primary'>
        <Link to='/' className='header__home-link d-flex align-items-center'>
          <img
            src={LogoImg}
            alt='The logo for the Progressive Massachusetts Legislator Scorecard'
            style={{ maxHeight: '45px', marginRight: '.7rem' }}
          />
          <span className='sr-only'>Progressive Massachusetts Legislative Scorecard</span>
        </Link>

        <div className='text-md-right mt-3 mt-md-0'>
          <MobileFriendlyList
            className='list-unstyled d-flex'
            style={{ justifyContent: 'space-between' }}>
            <li className='ml-md-3'>
              <Link to='/all-legislators'>
                All <abbr aria-label='Massachusetts'>MA</abbr> Legislators
              </Link>
            </li>
            <li className='ml-md-3'>
              <Link to='/sponsorships/all-bills'>Sponsored Bills</Link>
            </li>
            <li className='ml-md-3'>
              <a
                href='https://gdoc.pub/doc/19eWMYZ3IZaT-YFqswn-LqGOnYzHMID7LXEj1Gn1GNu0'
                target='_blank'
                rel='noreferrer'>
                F.A.Q. <span className='sr-only'>opens in new window</span>
              </a>
            </li>
            <li className='ml-md-3'>
              <a
                className='btn btn-secondary'
                href='https://www.progressivemass.com/donate/'
                target='_blank'
                rel='noreferrer'>
                Donate <span className='sr-only'>opens in new window</span>
              </a>
            </li>
          </MobileFriendlyList>
        </div>
      </nav>
    </header>
  )
}

export default Nav
