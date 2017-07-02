import React from 'react'
import LegislatorListComponent
  from './../src/routes/all-legislators/LegislatorListComponent'
import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { MemoryRouter } from 'react-router'

it('renders correctly', () => {
  const tree = shallow(<LegislatorListComponent />)
  expect(toJSON(tree)).toMatchSnapshot()
})
