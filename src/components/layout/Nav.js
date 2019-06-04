import React from 'react'
import { Link } from 'gatsby'
import LogoImg from '../../images/scorecard-logo.svg'

const Nav = () => {
  return (
    <header>
      <nav
        className="module-container py-3 d-md-flex justify-content-between align-items-center"
        aria-label="primary"
      >
        <Link to="/" className="header__home-link d-flex align-items-center">
          <img
            src={LogoImg}
            alt=""
            style={{ width: '35px', marginRight: '.7rem' }}
          />

          <span>
            <span
              className="text-uppercase mb-0 d-block"
              style={{ fontWeight: 'normal', fontSize: '.9rem' }}
            >
              Progressive Massachusetts
            </span>
            <span className="h5 mb-0 d-block" style={{ fontSize: '1.4rem' }}>
              Legislator Scorecard
            </span>
          </span>
        </Link>

        <div className="text-md-right mt-3 mt-md-0">
          <ul className="list-unstyled d-flex" style={{justifyContent: "space-between"}}>
            <li className="mr-4 mr-md-5">
              <Link to="/all-legislators">
                View All <abbr aria-label="Massachusetts">MA</abbr> Legislators
              </Link>
            </li>
            <li className="ml-sm-2">
              <a
                href="https://gdoc.pub/doc/19eWMYZ3IZaT-YFqswn-LqGOnYzHMID7LXEj1Gn1GNu0"
                target="_blank"
              >
                F.A.Q. <span className="sr-only">opens in new window</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav
