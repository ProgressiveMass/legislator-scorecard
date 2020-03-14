import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StickyContainer, Sticky } from 'react-sticky'
import getTagData from './tagMap'

const TagFilterList = ({ tags, tagFilter, toggleFilter }) => {
  return (
  <>
    <span className="label d-md-inline-block mr-3">Filter Bills By Topic:</span>
    <ul className="d-sm-inline-flex list-unstyled">
      {tags.map(t => {
        let badgeClass = 'badge-light'
        if (!tagFilter || tagFilter === t) {
          badgeClass = getTagData(t).badge
        }
        return (
          <li className="mt-1 mt-sm-0 mr-sm-1" key={getTagData(t).name}>
            <button
              className={`btn btn-sm badge ${badgeClass}`}
              style={{ fontSize: '.9rem' }}
              aria-pressed={tagFilter === t ? 'true' : 'false'}
              onClick={() => toggleFilter(t)}
            >
              {getTagData(t).name}
            </button>
          </li>
        )
      })}
    </ul>
  </>
)
}

const RowTags = ({ tags, toggleFilter }) => (
  <ul className="list-unstyled">
    {tags.map(t => {
      return (
        <li className="mr-1 mb-1 d-inline-block">
          <button
            key={getTagData(t).name}
            className={`btn badge ${getTagData(t).badge}`}
            onClick={() => {
              toggleFilter(t)
            }}
          >
            {getTagData(t).name}
          </button>
        </li>
      )
    })}
  </ul>
)

const filterRows = (data, tagFilter) => {
  if (!tagFilter) return data
  return data.filter(d => d.tags.indexOf(tagFilter) > -1)
}

const EmptyView = () => {
  return (
    <div className="my-5 py-5 text-center">
      <p className="h2 mb-5 pb-5">No Data Available</p>
    </div>
  )
}

const LegislatorTable = ({
  head,
  description,
  title,
  rowComponent: RowComponent,
  rowData,
  lastName,
}) => {
  const [tagFilter, setTagFilter] = useState('')

  const toggleFilter = tag => setTagFilter(tagFilter === tag ? '' : tag)

  const tags = Array.from(
    new Set(
      rowData.map(c => c.tags).reduce((acc, curr) => acc.concat(curr), [])
    )
  ).sort()

  const filteredData = filterRows(rowData, tagFilter)

  if (!filteredData.length) return <EmptyView />

  return (
    <div className="table-container">
      <h3 className="sr-only">{title}</h3>
      <div className="mt-4 mb-1 my-sm-4 py-sm-2">
        <p className="lead mb-0 readable-measure">{description}</p>
      </div>
      <StickyContainer>
        <div>
          <div className="pt-3">
            <TagFilterList
              tags={tags}
              tagFilter={tagFilter}
              toggleFilter={toggleFilter}
            />
          </div>
        </div>
        <table className="table table--top-row-fixed">
          <Sticky>
            {({ style: stickyStyle }) => (
              <thead style={stickyStyle}>{head}</thead>
            )}
          </Sticky>
          <tbody>
            {filteredData.map(d => (
              <RowComponent
                lastName={lastName}
                rowData={d}
                tags={<RowTags toggleFilter={toggleFilter} tags={d.tags} />}
              />
            ))}
          </tbody>
        </table>
      </StickyContainer>
    </div>
  )
}

LegislatorTable.propTypes = {
  lastName: PropTypes.string,
  head: PropTypes.node,
  description: PropTypes.node,
  title: PropTypes.string,
  rowComponent: PropTypes.node,
  rowData: PropTypes.arrayOf(PropTypes.object),
}

export default LegislatorTable
