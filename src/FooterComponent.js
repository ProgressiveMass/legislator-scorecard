import React from 'react'

const Footer = (props) => {
  return (<footer className='container-fluid'>
    <div className='row align-items-center no-gutters py-5'>
      <div className='col-sm-12 col-md-3 p-3'>
        <a href='http://www.progressivemass.com/'>
          <img src={require('./img/progressive-mass-logo.png')}
            alt='Progressive Massachusetts Logo'
          />
        </a>
      </div>
      <div className='col-sm-12 col-md-9 p-3'>
        <div className='heading-font p-md-l-5'>
          <p>
            Site created by <a href='http://alex.holachek.com' target='_blank'>Alex Holachek</a>.
          </p>
          <p className='mb-0'>
            Vote and cosponsorship data provided by <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachusetts</a>.
          </p>
          <p>
            Additional legislator information sourced from the <a href='http://docs.openstates.org/en/latest/api/' target='_blank'>Open States API</a>.
          </p>
          <p>
            For questions and comments, contact
            <address>
              grassroots@progressivemass.com
            </address>
          </p>
        </div>
      </div>
    </div>
  </footer>)
}

export default Footer
