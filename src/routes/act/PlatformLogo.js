
import React, { PropTypes } from 'react'

const PlatformLogo = (props) => {
  switch (props.platforms[0]) {
    case 'shared prosperity':
      return renderEconomyLogo()
    case 'all means all':
      return renderAllMeansAllLogo()
    case 'good govt/strong democracy':
      return renderGovernmentLogo()
    case 'infrastructure/environment':
      return renderEnvironmentLogo()
    default:
      return (
        <div className='pb-4 py-md-0'>
          <img src={require('./../../img/progressive-mass-logo.png')}
            alt='Progressive Massachusetts'
            className='legislator-portrait'
          />
        </div>
      )
  }
}

function renderEconomyLogo () {
  return (
    <div className='pb-4 py-md-0 pltfm-logo-container'>
      <h3 className='text-left heading__pltfm-logo'>Shared</h3>
      <img src={require('../../img/platform_logos/linechrt.svg')}
        alt='Shared Prosperity'
        className='pltfm-logo'
      />
      <h6 className='text-right heading__pltfm-logo'>Prosperity</h6>
    </div>
  )
}

function renderAllMeansAllLogo () {
  return (
    <div className='pb-4 py-md-0 pltfm-logo-container'>
      <h5 className='text-center heading__pltfm-logo'>All Means</h5>
      <img src={require('../../img/platform_logos/group.svg')}
        alt='All Means All'
        className='pltfm-logo--compressed'
      />
      <h2 className='text-center heading__pltfm-logo'>All</h2>
    </div>
  )
}

function renderGovernmentLogo () {
  return (
    <div className='pb-4 py-md-0 pltfm-logo-container' style={{ fontSize: '0.9rem' }}>
      <p className='text-left font-weight-bold m-0'>Good</p>
      <p className='text-left font-weight-light m-0'>Government</p>
      <img src={require('../../img/platform_logos/gvmnt.svg')}
        alt='Good Government/Strong Democracy'
        className='pltfm-logo--compressed m-0'
      />
      <p className='text-right font-weight-bold m-0'>Strong</p>
      <p className='text-right font-weight-light m-0'>Democracy</p>
    </div>
  )
}

function renderEnvironmentLogo () {
  return (
    <div className='pb-4 py-md-0 pltfm-logo-container'>
      <img src={require('../../img/platform_logos/recycle.svg')}
        alt='Infrastructure/Environment'
        className='pltfm-logo--compressed mb-0'
      />
      <h6 className='text-center heading__pltfm-logo'>Infrastructure/</h6>
      <h6 className='text-center heading__pltfm-logo'>Environment</h6>
    </div>
  )
}

PlatformLogo.propTypes = {
  platforms: PropTypes.array.isRequired
}

export default PlatformLogo
