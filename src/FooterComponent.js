/* eslint-disable max- */

import React from 'react'

const Footer = (props) => {
  return (<footer>
    <div className='module-container'>
      <div className='row align-items-top no-gutters py-5'>
        <div className='col-sm-12 p-3 p-md-0'>
          <a href='http://www.progressivemass.com/'>
            <img src={require('./img/progressive-mass-logo.png')}
              alt='Progressive Massachusetts Logo'
            />
          </a>
        </div>
        <div className='col-sm-12 col-md-5 pt-md-3'>
          <p>
            <b>The Legislator Scorecard is the culmination of a large amount of time & effort.</b> <br />
            If you've found it valuable, please consider becoming <a href='https://progressivemass.nationbuilder.com/contribute'>a contributing member of Progressive Mass.</a>
          </p>
          <p>
            For questions and comments, contact grassroots@progressivemass.com
          </p>
        </div>
        <div className='col-sm-12 col-md-5 offset-md-2 '>
          <div className='pt-md-3'>
            <p>
              Site created by <a href='http://alex.holachek.com' target='_blank'>Alex Holachek</a>.
            </p>

            <p>
              Supplemental legislator information sourced from the <a href='http://docs.openstates.org/en/latest/api/' target='_blank'>Open States API</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>)
}

export default Footer
