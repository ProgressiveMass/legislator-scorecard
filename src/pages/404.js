import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' description='The page could not be found'/>
    <h1>NOT FOUND</h1>
    <Link to='/'> Take me home</Link>
  </Layout>
)

export default NotFoundPage
