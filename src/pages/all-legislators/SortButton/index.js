import React from 'react'
import PropTypes from 'prop-types'
import sortArrowFaded from './sort-arrows-faded.svg'
import sortArrowSelected from './sort-arrows-selected.svg'

const SortButton = ({ currentSort = [], sort, onClick, title }) => {
  const image =
    currentSort[0] === sort ? (
      <img src={sortArrowSelected} alt="" style={{ maxWidth: '1rem' }} />
    ) : (
      <img src={sortArrowFaded} alt="" style={{ maxWidth: '1rem' }} />
    )

  const rotated = currentSort[0] === sort && currentSort[1] === 'desc'

  return (
    <button
      type="button"
      className="btn btn-sm btn-icon text-left"
      style={{ width: '100%' }}
      onClick={() => onClick(sort)}
      aria-label="sort"
    >
      <span className="label d-inline-block pr-3">{title}</span>
      <span className={`${rotated ? 'rotated' : ''}`}>{image}</span>
    </button>
  )
}

SortButton.propTypes = {
  sort: PropTypes.string.isRequired,
  currentSort: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default SortButton
