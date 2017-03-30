import React, { PropTypes } from 'react'

export default class SortButton extends React.Component {

  render () {
    let image
    if (this.props.currentSort[0] === this.props.sort) {
      image = <img src={require('./../../img/sort-arrows-selected.svg')} alt='' style={{ maxWidth : '16px' }} />
    } else {
      image = <img src={require('./../../img/sort-arrows-faded.svg')} alt='' style={{ maxWidth : '16px' }} />
    }

    const rotated = (this.props.currentSort[0] === this.props.sort && this.props.currentSort[1] === 'desc')

    return (<button
      type='button'
      className='btn btn-sm btn-icon text-left'
      style={{ width: '100%' }}
      onClick={() => this.props.onClick(this.props.sort)}
      aria-label='sort'>
      <span className='label d-inline-block pr-3'>{this.props.title}</span>
      <span className={`${rotated ? 'rotated' : ''}`}>{image}</span>
    </button>)
  }
}

SortButton.propTypes = {
  sort : PropTypes.string.isRequired,
  currentSort : PropTypes.array.isRequired,
  onClick : PropTypes.object.isRequired,
  title : PropTypes.string.isRequired
}
