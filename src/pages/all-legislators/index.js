import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Tabs from 'react-responsive-tabs'
import LegislatorList from './LegislatorList'
import Layout from '../../components/layout'
import ListPageHeading from '../../components/ListPageHeading'

// Ideally, these should not be hard-coded here. We should fix this some day.
const mostRecentYear = 2023
const mostRecentSessionNumber = '193rd'

export const legislatorQuery = graphql`
  {
    dataJson {
      _2023 {
        houseVotes {
          id
          score
          recordedVotePercentage
        }
        senateVotes {
          id
          score
          recordedVotePercentage
        }
      }
    }
    allSenateLegislatorsJson {
      edges {
        node {
          id
          name
          givenName
          familyName
          party
          district
          image
        }
      }
    }
    allHouseLegislatorsJson {
      edges {
        node {
          id
          name
          givenName
          familyName
          party
          district
          image
        }
      }
    }
  }
`

const createLegislatorList = (legislatorArr, voteDataArr) => {
  const voteData = voteDataArr.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
  return legislatorArr
    .map(({ node }) => node)
    .map((data) => {
      return {
        ...data,
        name: [data.familyName, data.givenName].join(', '),
      }
    })
    .map((data) => {
      const relevantVoteData = voteData[data.id]
      return {
        ...data,
        ...relevantVoteData,
      }
    })
}

const processQuery = ({ allHouseLegislatorsJson, allSenateLegislatorsJson, dataJson }) => {
  return {
    senators: createLegislatorList(
      allSenateLegislatorsJson.edges,
      dataJson[`_${mostRecentYear}`].senateVotes
    ),
    houseReps: createLegislatorList(
      allHouseLegislatorsJson.edges,
      dataJson[`_${mostRecentYear}`].houseVotes
    ),
  }
}

const AllLegislators = () => {
  const legislatorMetadata = processQuery(useStaticQuery(legislatorQuery))
  const tabItems = [
    {
      title: 'House Reps',
      component: (
        <LegislatorList
          data={legislatorMetadata.houseReps}
          chamber='lower'
          sessionNumber={mostRecentSessionNumber}
        />
      ),
    },
    {
      title: 'Senators',
      component: (
        <LegislatorList
          data={legislatorMetadata.senators}
          chamber='upper'
          sessionNumber={mostRecentSessionNumber}
        />
      ),
    },
  ].map((t) => {
    return {
      title: t.title,
      getContent: () => t.component,
    }
  })

  return (
    <Layout>
      <div className='tinted-background'>
        <ListPageHeading>All Current MA Legislators</ListPageHeading>
        <div className='mt-4 inverted-tabs'>
          <Tabs items={tabItems} showMore={false} transform={false} />
        </div>
      </div>
    </Layout>
  )
}

export default AllLegislators
