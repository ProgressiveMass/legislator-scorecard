import React from 'react'

const NewSenatorMessageComponent = (props) => {
  return (
    <div className='white-floated'>
      <p className='lead'>
        <b>We were unable to find votes by this legislator for the 2015-2016 session.</b>
      </p>
      <p>
        This most likely means he or she is a <b>first-term state senator</b>.
      </p>
      <p>You can follow the profile link above to learn more about the current state senator, or
      check out the voting table below to view the previous senator's voting record.</p>
    </div>)
}

export default NewSenatorMessageComponent
