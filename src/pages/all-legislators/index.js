import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Tabs from 'react-responsive-tabs'
import LegislatorList from './LegislatorList'
import Layout from '../../components/layout'
import { getLastName } from '../../utilities'

const legislatorQuery = graphql`
  {
    dataJson {
      _2017 {
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
    .map(data => {
      const lastName = getLastName(data.name)
      const firstName = data.name.split(/\s/)[0]
      return { ...data, name: [lastName, firstName].join(', ') }
    })
    .map(data => {
      const relevantVoteData = voteData[data.id]
      return {
        ...data,
        ...relevantVoteData,
      }
    })
}

const processQuery = ({
  allHouseLegislatorsJson,
  allSenateLegislatorsJson,
  dataJson,
}) => {
  return {
    senators: createLegislatorList(
      allSenateLegislatorsJson.edges,
      dataJson._2017.senateVotes
    ),
    houseReps: createLegislatorList(
      allHouseLegislatorsJson.edges,
      dataJson._2017.houseVotes
    ),
  }
}

const AllLegislators = () => {
  const legislatorMetadata = processQuery(useStaticQuery(legislatorQuery))
  const tabItems = [
    {
      title: 'House Reps',
      component: (
        <LegislatorList data={legislatorMetadata.houseReps} chamber="lower" />
      ),
    },
    {
      title: 'Senators',
      component: (
        <LegislatorList data={legislatorMetadata.senators} chamber="upper" />
      ),
    },
  ].map(t => {
    return {
      title: t.title,
      getContent: () => t.component,
    }
  })

  return (
    <Layout>
      <div className="tinted-background">
        <h1
          className="h2 mt-4 font-weight-light text-center"
          style={{ marginBottom: '2rem' }}
        >
          All Current MA Legislators
        </h1>
        <div className="mt-4 inverted-tabs">
          <Tabs items={tabItems} showMore={false} transform={false} />
        </div>
      </div>
    </Layout>
  )
}

export default AllLegislators
