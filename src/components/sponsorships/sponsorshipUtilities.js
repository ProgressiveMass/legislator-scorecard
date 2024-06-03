import React from 'react'

export const getBillStatus = (houseStatus, senateStatus) => {
  let billStatus = 'Not Passed'
  let billStatusColor = 'badge-gray'

  if (houseStatus === 'Passed') {
    if (senateStatus === 'Passed') {
      billStatus = 'Passed House and Senate'
      billStatusColor = 'badge-yellow'
    } else {
      billStatus = 'Passed House'
      billStatusColor = 'badge-yellow'
    }
  } else if (senateStatus === 'Passed') {
    billStatus = 'Passed Senate'
    billStatusColor = 'badge-yellow'
  } else if (houseStatus === "Enacted") {
    billStatus = 'Enacted'
    billStatusColor = 'badge-green'
  } else if (houseStatus === 'In Conference Committee') {
    billStatus = 'In Conference Committee'
    billStatusColor = 'badge-yellow'
  }

  return { billStatus, billStatusColor }
}

export const getBillStatusBadge = (houseStatus, senateStatus) => {
  const { billStatus, billStatusColor } = getBillStatus(houseStatus, senateStatus)
  const badge = billStatus === 'Passed House and Senate' ? (
    <>
      <span className={`badge ${billStatusColor}`} style={{ fontSize: '.9rem' }}>
        Passed House
      </span>
      <span className={`badge ${billStatusColor}`} style={{ fontSize: '.9rem' }}>
        Passed Senate
      </span>
    </>
  )
  : (
    <span className={`badge ${billStatusColor}`} style={{ fontSize: '.9rem' }}>
      {billStatus}
    </span>
  )
  return badge
}
