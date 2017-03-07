import React, { PropTypes } from 'react'

const Footer = (props) => {
  return (<footer className='container'>
    <div className='lead'>
      Data provided by <a href='http://www.progressivemass.com/scorecards_and_roll_calls'>Progressive Massachussetts</a>
      <div>
        {/* Website made by <a href='http://alex.holachek.com'>Alex</a> */}
      </div>
    </div>
  </footer>)
}

export default Footer

Footer.propTypes = {
}
