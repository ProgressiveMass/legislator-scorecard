import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import SortButton from './SortButtonComponent'

export default class StateRepTable extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.sortData = this.sortData.bind(this)
    this.setSort = this.setSort.bind(this)
  }

  state = {
    sort : ['name', 'desc']
  }

  renderRow (d, i) {
    return (
      <tr>
        <td>{i + 1}</td>
        <td><Link to={`/legislator/${d.id}`}><b>{d.name}</b></Link></td>
        <td>{d.party.slice(0, 1)}</td>
        <td><b>{d.pm_vote_score ? d.pm_vote_score + '%' : 'N/A' }</b></td>
        <td><Link to={`/legislator/${d.id}`} className='btn btn-sm btn-block btn-secondary'>
          <img src={require('./../../img/inspection.svg')} alt='' style={{ maxWidth : '20px' }} />
          &nbsp;Scorecard
        </Link></td>

      </tr>
    )
  }

  sortData (data) {
    const normalizeSortVal = (val) => {
      if (!val) {
        return 0
      } else if (typeof val === 'string') {
        return val.toLowerCase()
      } else {
        return val
      }
    }

    const sortKey = this.state.sort[0]
    const order = this.state.sort[1]
    return data.sort((a, b) => {
      const aSort = normalizeSortVal(a[sortKey])
      const bSort = normalizeSortVal(b[sortKey])
      if (aSort < bSort) {
        return (order === 'asc' ? 1 : -1)
      } else if (aSort > bSort) {
        return (order === 'asc' ? -1 : 1)
      } else {
        // use rating as secondary sort
        return b.pm_vote_score - a.pm_vote_score
      }
    })
  }

  setSort (sort) {
    if (this.state.sort[0] === sort) {
     // just switch between asc and desc
      const order = this.state.sort[1] === 'asc' ? 'desc' : 'asc'
      this.setState({ sort : [sort, order] })
    } else {
      this.setState({ sort : [sort, 'desc'] })
    }
  }

  render () {
    // sort data
    const data = this.sortData(this.props.data)

    return (<div className='white-floated pt-5'>
      <table className='table mx-auto table-hover' style={{ maxWidth : '750px' }}>
        <thead>
          <tr>
            <th />
            <th>Name
              <SortButton onClick={this.setSort} sort='name' currentSort={this.state.sort} />
            </th>
            <th>Party
              <SortButton onClick={this.setSort} sort='party' currentSort={this.state.sort} />
            </th>
            <th>Prog. Rating
              <SortButton onClick={this.setSort} sort='pm_vote_score' currentSort={this.state.sort} />
            </th>
            <th />

          </tr>
        </thead>
        <tbody>
          {data.map(this.renderRow)}
        </tbody>
      </table>
    </div>)
  }
}

StateRepTable.propTypes = {
  data : PropTypes.object.isRequired
}
