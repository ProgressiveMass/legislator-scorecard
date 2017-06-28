import React from 'react'
import LegislatorListComponent
  from './../src/routes/all-legislators/LegislatorListComponent'
import ShallowRenderer from 'react-test-renderer/shallow'
import { MemoryRouter } from 'react-router-dom'

const shallowRenderer = new ShallowRenderer()

it('renders correctly', () => {
  debugger
  const tree = shallowRenderer.render(
    <MemoryRouter initialEntries={[{ key: 1 }]}>
      <LegislatorListComponent />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
