import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout'
import Tabs from 'react-responsive-tabs'
import LegislatorList from '../../pages/all-legislators/LegislatorList'

const TabsContaner = styled.div`
  background-color: #eaecef;
  padding: 1rem 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 950px) {
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
  @media (max-width: 950px) {
    padding: 0 2rem;
  }
`
const BillInformation = styled.div`
  margin: auto;
  margin-top: 2rem;
  background-color: white;
  padding: 2rem;
`
const BillTitle = styled.h2`
  @media (max-width: 950px) {
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
  pageContext: { billData: bill, houseSponsors, senateSponsors },
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
      <Wrapper>
        <Container className='module-container tinted-background '>
          <BillInformation>
            <BillTitle>{bill.name}</BillTitle>
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
