import React from 'react'

export default function SponsoredBill({ pageContext: { billData } }) {
  return (
    <>
      <div>{JSON.stringify(billData, null, 2)}</div>
    </>
  )
}
