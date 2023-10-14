import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/layout'
import LegislatorTable from '../../components/legislator/LegislatorTable'
import ListPageHeading from '../../components/ListPageHeading'
import InfoPopover from '../../components/InfoPopover'
import { consolidateBillNumbers } from '../../utilities'
import { QUERIES } from '../../utilities'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  gap: 1rem;
  justify-items: center;
  align-items: center;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 0 2rem;
  }
`

const StyledRow = styled.tr`
  @media ${QUERIES.phoneAndSmaller} {
    display: grid;
    grid-template-areas: 'title title' 'number status' 'summary summary';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content min-content 1fr;

    & > * {
      border: none;
    }

    ul {
      margin: 0;
    }

    & > td#number,
    & > td#status {
      display: flex;
      flex-direction: column;
      padding-top: 0;
      padding-bottom: 0;
    }

    & > td#number {
      grid-area: number;
    }

    & > td#title {
      grid-area: title;
    }

    & > td#status {
      text-align: center;
      grid-area: status;
    }

    & > td#summary {
      grid-area: summary;
    }
  }
`

const SponsorshipRow = (props) => {
  const { tags, rowData, isCurrentYear, familyName } = props
  const {
    bill_number,
    showPairedDisclaimer,
    shorthand_title,
    description,
    yourLegislator,
    url,
    otherNames,
  } = rowData

  const passedBills = ['H2908', 'H2909', 'H603']
  const passedHouse = ['H1940']
  const passedHouseAndSenate = ['H1796']
  let billStatus = 'Not Yet'
  let billStatusColor = 'badge-gray'

  if (passedHouseAndSenate.includes(bill_number)) {
    billStatus = 'Passed House and Senate'
    billStatusColor = 'badge-yellow'
  }
  if (passedHouse.includes(bill_number)) {
    billStatus = 'Passed House'
    billStatusColor = 'badge-yellow'
  }
  if (passedBills.includes(bill_number)) {
    billStatus = 'Passed'
    billStatusColor = 'badge-green'
  }

  console.log('bill_number', bill_number)
  return (
    <StyledRow>
      <td id='number' className='text-muted' style={{ width: '15%' }}>
        <div className='font-weight-bold'>
          {otherNames ? [bill_number, ...otherNames.filter(Boolean)].join(' / ') : bill_number}
          &nbsp;
          {showPairedDisclaimer ? (
            <InfoPopover text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking sponsorship we treat them as a single bill.' />
          ) : null}
        </div>

        <div>{tags}</div>
      </td>
      <td id='title' style={{ width: '25%', fontWeight: 'bold' }}>
        <div>
          <Link to={`/sponsorships/${bill_number}`}>{`${shorthand_title}`}</Link>
        </div>
      </td>
      <td
        id='status'
        className='text-muted'
        data-label='Passed?'
        style={{ width: '10%', textAlign: 'center' }}>
        {billStatus === 'Passed House and Senate' ? (
          <>
            <span className={`badge ${billStatusColor}`} style={{ fontSize: '.9rem' }}>
              Passed House
            </span>
            <span className={`badge ${billStatusColor}`} style={{ fontSize: '.9rem' }}>
              Passed Senate
            </span>
          </>
        ) : (
          <span className={`badge ${billStatusColor}`} style={{ fontSize: '.9rem' }}>
            {billStatus}
          </span>
        )}
      </td>

      <td id='summary' style={{ width: '50%' }}>
        <p>{description}</p>
      </td>
    </StyledRow>
  )
}

export default function SponsoredBills({ pageContext: { sponsoredBills, legislationData } }) {
  return (
    <Layout>
      <div className='tinted-background'>
        <Container>
          <ListPageHeading>All Sponsored bills</ListPageHeading>
          <div className='bill-list'>
            <LegislatorTable
              title='Sponsored Bills'
              description={''}
              rowData={consolidateBillNumbers(
                sponsoredBills.map(([billNumber, billData]) => {
                  return {
                    otherNames: [''],
                    ...billData,
                  }
                }),
                'name'
              )}
              familyName={''}
              isCurrentYear={true}
              head={
                <>
                  <tr>
                    <th style={{ width: '15%' }}>Bill</th>
                    <th style={{ width: '25%' }}>Title</th>
                    <th style={{ width: '10%' }}>Passed?</th>
                    <th style={{ width: '50%' }}>
                      Summary from{' '}
                      <a href='http://www.progressivemass.com/' target='_blank' rel='noreferrer'>
                        Progressive Mass
                      </a>
                    </th>
                  </tr>
                </>
              }
              rowComponent={SponsorshipRow}
            />
          </div>
        </Container>
      </div>
    </Layout>
  )
}
