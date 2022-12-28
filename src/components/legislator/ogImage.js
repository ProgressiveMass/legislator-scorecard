import React from 'react'
import PropTypes from 'prop-types'
import Rating from './Rating'
import defaultPhoto from '../../images/default-photo.jpg'

const LegislatorOgImage = ({ pageContext: { chamber, pageData } }) => {
  const legislatorTitle = chamber === 'senate' ? 'Sen.' : 'Rep.'
  const lastName = pageData.legislator.familyName
  var partySuffix
  if (pageData.legislator.party === 'Democratic') {
    partySuffix = '(D)'
  } else if (pageData.legislator.party === 'Republican') {
    partySuffix = '(R)'
  } else {
    partySuffix = '(I)'
  }
  const fullName = [
    legislatorTitle,
    pageData.legislator.name,
    partySuffix,
  ].join(' ')
  var fontSize = Math.min(65 - fullName.length, 40)
  return (
    <div className='row no-gutters align-items-md-center'>
      <div className='col-12 pt-2 px-4'>
        <h1 className={'metadata__heading mt-1'} style={{ fontSize: fontSize }}>
          <span className='font-weight-normal'>{fullName}</span>
        </h1>
        <div className='row no-gutters'>
          <div className='col-4'>
            {pageData.legislator.image ? (
              <img
                src={pageData.legislator.image}
                alt={'Photo of ' + pageData.legislator.name}
                className='legislator-portrait-social'
                onError={(e) => {
                  if (e.target.src !== window.location.origin + defaultPhoto) {
                    e.target.src = defaultPhoto
                  }
                }}
              />
            ) : null}
          </div>
          <div className='col-8'>
            <Rating
              chamber={chamber}
              lastName={lastName}
              title={legislatorTitle}
              rating={pageData.rating}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

LegislatorOgImage.propTypes = {
  legislator: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
}

export default LegislatorOgImage
