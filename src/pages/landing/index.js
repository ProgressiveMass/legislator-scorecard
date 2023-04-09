import React from 'react'
import SearchInstructions from './SearchInstructions'
import SEO from '../../components/seo'
import Layout from '../../components/layout'

export default () => {
  return (
    <Layout>
      <SEO description='Are your Massachusetts representatives fighting for your progressive values?' />
      <section className='landing__header'>
        <div className='heading-font landing__header--1'>
          <div className='module-container'>
            <div className='row no-gutters align-items-center' style={{ minHeight: '50vh' }}>
              <div className='col-12'></div>
              <div className='col-md-6 col-lg-7 py-md-0'>
                <h1 className='landing__h1'>Progressive Massachusetts Legislator Scorecard</h1>
                <hr />
                <div className='landing__cta h1'>
                  Are your <b className='font-weight-800'>Massachusetts</b> representatives fighting
                  for your <b className='font-weight-800'>progressive</b> values?
                </div>
              </div>

              <div className='col-md-6 col-lg-5 blue-background pl-md-5 pt-lg-3'>
                <div className='mx-auto' style={{ maxWidth: '500px' }}>
                  <SearchInstructions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='module-container'>
        <h2 className='sr-only'>About Progressive Massachusetts</h2>

        <div className='landing__section--1 row no-gutters align-items-center'>
          <div className='col-md-5 offset-md-1 pr-md-3 mb-5 mb-md-0'>
            <img
              src={require('./images/cards.png')}
              alt='Examples of the Progressive Massachusetts Legislator Report Cards for three legislators'
              className='img-fluid mx-auto d-block'
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className='col-md-4 mb-5 mb-md-0 text-lg '>
            <p>
              <a
                href='http://www.progressivemass.com/'
                target='_blank'
                className='heading-font text-lg'
                rel='noreferrer'>
                Progressive Massachusetts
              </a>
              <br />
              is a grassroots organization that tracks legislation in order to provide people with
              the knowledge they need to enact positive local change.
            </p>
          </div>
        </div>
      </section>

      <section className='landing__section--2'>
        <div className='module-container'>
          <div className='row'>
            <div className='col-sm-12'>
              <h2 className='h1 mb-0 pb-5'>The Legislator Scorecard can help you:</h2>
            </div>
          </div>
          <div className='row align-items-stretch pb-4'>
            <div className='col-md-4 mb-4 mb-md-0'>
              <div className='white-background p-3 mx-auto' style={{ maxWidth: '400px' }}>
                <h3 className='h4'>
                  <img
                    src={require('./images/fine_print.svg')}
                    alt='A page of small text with magnifying glass over it'
                    style={{ width: '80px' }}
                    className='my-4'
                  />
                  Track Legislation
                </h3>
                <p>
                  Progressive Mass provides summaries of important bills and follows their paths
                  through the State House.
                </p>
              </div>
            </div>
            <div className='col-md-4 mb-4 mb-md-0'>
              <div className='white-background p-3 mx-auto' style={{ maxWidth: '400px' }}>
                <h3 className='h4'>
                  <img
                    src={require('./images/legislator.svg')}
                    alt='A person reading a book'
                    style={{ width: '80px' }}
                    className='my-4'
                  />
                  Learn About Your Reps
                </h3>
                <p>
                  By viewing which legislation your local representatives cosponsored and voted for
                  or against, you can begin to understand their legislative priorities.
                </p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='white-background p-3 mx-auto' style={{ maxWidth: '400px' }}>
                <h3 className='h4'>
                  <img
                    src={require('./images/collaboration.svg')}
                    alt='Two people having a conversation'
                    style={{ width: '80px' }}
                    className='my-4'
                  />
                  Take Action
                </h3>
                <p>
                  Call or email your local legislators and talk to them about legislation that&#39;s
                  important to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
