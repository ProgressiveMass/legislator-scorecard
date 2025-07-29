import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InfoPopover from '../InfoPopover'
import LegislatorTable from './LegislatorTable'
import { QUERIES } from '../../utilities'
import { getBillStatusBadge, getBillStatus } from '../sponsorships/sponsorshipUtilities'

const BaseTableRow = styled.tr`
  border-bottom: 1px solid #eee;
  @media ${QUERIES.tabletAndSmaller} {
    margin: 15px;
    border-radius: 15px;
    background-color: #f9f9f9;
  }
`

const PassedTableRow = styled(BaseTableRow)`
  background-color: #fef9c344;
  border-bottom: 1px solid #fef9c3;
`

const EnactedTableRow = styled(BaseTableRow)`
  background-color: #71B84422;
  border-bottom: 1px solid #71B84444;
`

const Cosponsorship = ({ indicator, isPassed, isCurrentSponsorshipYear }) => {
  if (indicator === false) {
    if (isCurrentSponsorshipYear && !isPassed) {
      return <span className='badge badge-danger'>Not Yet</span>
    } else {
      return <span className='badge badge-danger'>No</span>
    }
  } else if (indicator === true) {
    return <span className='badge badge-primary'>Yes</span>
  } else {
    return <span className='badge badge-clear'>N/A</span>
  }
}

const SponsorshipRow = ({
  tags,
  rowData: {
    bill_number,
    showPairedDisclaimer,
    shorthand_title,
    description,
    yourLegislator,
    houseStatus,
    senateStatus, },
  isCurrentYear,
  familyName,
}) => {
  const { billStatus } = getBillStatus(houseStatus, senateStatus)
  const isPassed = billStatus !== "Not Passed Yet"
  const isEnacted = billStatus === "Enacted"
  let StyledTableRow = BaseTableRow
  if (isEnacted) {
    StyledTableRow = EnactedTableRow
  } else if (isPassed) {
    StyledTableRow = PassedTableRow
  }

  return (
    <StyledTableRow>
      <td className='text-muted' style={{ width: '15%' }}>
        <div className='font-weight-bold'>
          {bill_number}&nbsp;
          {showPairedDisclaimer ? (
            <InfoPopover text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking sponsorship we treat them as a single bill.' />
          ) : null}
        </div>

        <div>{tags}</div>
        {getBillStatusBadge(houseStatus, senateStatus)}
      </td>
      <td style={{ width: '30%' }}>
        <div>
          <a href={`/sponsorships/${bill_number}`} className='font-weight-bold'>
            {shorthand_title}
          </a>
        </div>
      </td>
      <td style={{ width: '40%' }} data-label=''>
        <p>{description}</p>
      </td>
      <td style={{ width: '15%' }} data-label={`${familyName} Cosponsored?`}>
        <Cosponsorship
          indicator={yourLegislator}
          isCurrentSponsorshipYear={isCurrentYear}
          isPassed={isPassed}
        />
      </td>
    </StyledTableRow>
  )
}

const description = (
  <>
    Cosponsoring legislation is an important way for a legislator to help put momentum behind
    certain bills. To learn more about which bills Progressive Mass thinks are most important to
    support, you can view{' '}
    <a
      className='font-weight-bold'
      target='_blank'
      href='http://www.progressivemass.com/agenda/'
      rel='noreferrer'>
      our Legislative Agenda
    </a>
    .
  </>
)

const SponsorshipTable = ({ data: { sponsorship, isCurrentSponsorshipYear }, familyName }) => {
  return (
    <LegislatorTable
      title='Cosponsored Bills'
      description={description}
      rowData={sponsorship}
      familyName={familyName}
      isCurrentYear={isCurrentSponsorshipYear}
      head={
        <>
          <tr>
            <th style={{ width: '15%' }}>Bill</th>
            <th style={{ width: '30%' }}>Title</th>
            <th style={{ width: '40%' }}>
              Summary from{' '}
              <a href='http://www.progressivemass.com/' target='_blank' rel='noreferrer'>
                Progressive Mass
              </a>
            </th>
            <th style={{ width: '15%' }}>{familyName} Cosponsored?</th>
          </tr>
        </>
      }
      rowComponent={SponsorshipRow}
    />
  )
}

export default SponsorshipTable

SponsorshipTable.propTypes = {
  data: PropTypes.object.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
