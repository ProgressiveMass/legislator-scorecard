/* eslint-disable max- */

import React from 'react'

const Footer = (props) => {
  return (<footer>
    <div className='module-container'>
      <div className='row align-items-top no-gutters py-5'>
        <div className='col-sm-12 p-3 p-md-0'>
          <a href='http://www.progressivemass.com/'>
            <img src={require('./../img/progressive-mass-logo.png')}
              alt='Progressive Massachusetts Logo'
            />
          </a>
        </div>
        <div className='col-sm-12 col-md-5 pt-md-3'>
          <p>
            <b>The Legislator Scorecard is the culmination of a lot of time & effort.</b> <br />
            If you've found it valuable, please consider becoming <a href='https://progressivemass.nationbuilder.com/contribute'>a contributing member of Progressive Mass.</a>
          </p>
          <p>
            For questions, comments, and corrections, contact grassroots@progressivemass.com.
          </p>
        </div>
        <div className='col-sm-12 col-md-4 offset-md-2 '>
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
      <div className='row no-gutters'>
        <small>Statehouse Dome image by <a href='https://www.flickr.com/photos/the-o/2334197459/in/photolist-4ygnzM-gKhvzq-78NEvk-e7RzWQ-dy5Lu-pZenn1-4vc5da-4F7BpN-dy5NE-gJNU2h-gKhzpS-93bS2-eD5LY-4F7BqA-4F7Bqu-R6Jckn-yTyo3-qHg6gw-e7KUZX-hRuy1S-pCitCS-gKhkJ5-4A4wRg-4oPPHq-2tMvEY-9XP2vH-4vgbko-doC1Wi-haZcum-RND2eC-atWgCm-oXcM1Z-dpfhz2-2Tj4PG-cEUBDY-78Nq6n-d63pqd-8ewVc5-jeDVsR-emH2iq-jCkdKY-6Q5yKJ-81MeTh-AA9y-4A8MxE-4F7Bq9-bBB2SN-SC9mbw-62g9Pz-8WuDvH'>David Ohmer</a></small>
      </div>

    </div>
  </footer>)
}

export default Footer
