import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout'
import Tabs from 'react-responsive-tabs'
import LegislatorList from '../../pages/all-legislators/LegislatorList'

const TabsContaner = styled.div`
  background-color: #eaecef;
  padding: 1rem;
`
const Container = styled.div`
  padding: 1rem 8rem;
`
const LinkContainer = styled.p`
  span:not(:last-child)::after {
    content: '/';
    margin: 0 5px;
  }
`

export default function SponsoredBill({
  pageContext: { billData: bill, houseSponsors, senateSponsors, sponsors },
}) {
  const tabItems = [
    {
      title: 'House Reps',
      component: <LegislatorList data={houseSponsors} chamber='lower' sessionNumber={'193rd'} />,
    },
    {
      title: 'Senators',
      component: <LegislatorList data={senateSponsors} chamber='upper' sessionNumber={'193rd'} />,
    },
  ].map((t) => {
    return {
      title: t.title,
      getContent: () => t.component,
    }
  })
  return (
    <Layout>
      <Container>
        <h2>{bill.name}</h2>
        <LinkContainer>
          {bill.otherBillNames.split('/').map((bill) => (
            <span key={bill}>
              <a href={`https://malegislature.gov/Bills/193/${bill.trim()}`} target='__blank'>
                {bill.trim()}
              </a>
            </span>
          ))}
        </LinkContainer>
        <p>Filed by {bill.sponsors} </p>
        <p>{bill.description}</p>
        <h3> Sponsors</h3>
        <TabsContaner className='mt-4 inverted-tabs'>
          <Tabs items={tabItems} showMore={false} transform={false} />
        </TabsContaner>
      </Container>
    </Layout>
  )
}
