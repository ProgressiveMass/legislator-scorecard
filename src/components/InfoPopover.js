import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'

const PopoverContent = props => {
  return (
    <div>
      <div className="h5">{props.title}</div>
      <p>{props.text}</p>
    </div>
  )
}

const InfoPopover = ({ title, position, text }) => (
  <div
    style={{
      maxWidth: '40px',
      display: 'inline-block',
      verticalAlign: 'text-bottom',
    }}
  >
    <Tooltip
      id={Math.random()}
      content={
        <div>
          {title ? <div className="h6">{title}</div> : ''}
          <p dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      }
      trigger="click"
      arrow="true"
      duration="200"
      position={position ? position : 'left'}
    >
      <button
        type="button"
        className="btn btn-icon btn-icon--basic"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <img
          src={require('../images/help.svg')}
          style={{ height: '18px', position: 'relative', top: '1px' }}
          alt=""
        />
        <span className="sr-only">more information</span>
      </button>
    </Tooltip>
  </div>
)

InfoPopover.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  position: PropTypes.string,
}

export default InfoPopover
