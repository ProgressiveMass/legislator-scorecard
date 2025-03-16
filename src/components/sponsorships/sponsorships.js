import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout'
import Tabs from 'react-responsive-tabs'
import LegislatorList from '../../pages/all-legislators/LegislatorList'
import { QUERIES } from '../../utilities'

const TabsContaner = styled.div`
  background-color: #eaecef;
  padding: 1rem 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  @media ${QUERIES.tabletAndSmaller} {
    padding: 0 0.5rem;
  }
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eaecef;
`

const Container = styled.div`
  padding: 1rem 2rem;

  display: flex;

  justify-content: center;
  flex-direction: column;
  @media ${QUERIES.tabletAndSmaller} {
    padding: 0 2rem;
  }
`
const BillInformation = styled.div`
  margin: auto;
  margin-top: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 6px;
  width: 100%;
`
const BillTitle = styled.h2`
  @media ${QUERIES.tabletAndSmaller} {
    font-size: 1.5rem;
  }
`
const SponsorshipTitle = styled.h3`
  margin: auto;
  padding: 0.5rem 0;
`

const LinkContainer = styled.p`
  span:not(:last-child)::after {
    content: '/';
    margin: 0 5px;
  }
`

export default function SponsoredBill({
  pageContext: { billData: bill, houseSponsors, senateSponsors, votesSessionOrdinal, sponsorshipsSessionNumber },
}) {
  console.log('bill: ', bill)
  const tabItems = [
    {
      title: `House Reps (${houseSponsors.length})`,
      component: <LegislatorList data={houseSponsors} chamber='lower' sessionNumber={votesSessionOrdinal} />,
    },
    {
      title: `Senators (${senateSponsors.length})`,
      component: <LegislatorList data={senateSponsors} chamber='upper' sessionNumber={votesSessionOrdinal} />,
    },
  ].map((t) => {
    return {
      title: t.title,
      getContent: () => t.component,
    }
  })
  return (
    <Layout>
      <Wrapper>
        <Container className='module-container tinted-background '>
          <BillInformation>
            <BillTitle>{bill.shorthand_title}</BillTitle>
            <LinkContainer>
              {bill.otherBillNames.split('/').map((bill) => (
                <span key={bill}>
                  <a href={`https://malegislature.gov/Bills/${sponsorshipsSessionNumber}/${bill.trim()}`} target='__blank'>
                    {bill.trim()}
                  </a>
                </span>
              ))}
            </LinkContainer>
            <p>Full title: {bill.name} </p>
            <p>Filed by {bill.sponsors} </p>
            <p>{bill.description}</p>
          </BillInformation>
          <TabsContaner className='mt-4 inverted-tabs'>
            <SponsorshipTitle> Sponsors</SponsorshipTitle>
            <Tabs items={tabItems} showMore={false} transform={false} />
          </TabsContaner>
        </Container>
      </Wrapper>
    </Layout>
  )
}
