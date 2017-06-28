import React from 'react'
import LandingPageComponent from './../src/routes/landing/LandingPageComponent'
import { Renderer } from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'
import { MemoryRouter } from 'react-router-dom'

function createNodeMock (element) {
  if (element.type === 'input') {
    return {
      focus () {}
    }
  }
  return null
}

const shallowRenderer = new ShallowRenderer()
debugger
it('renders correctly', () => {
  const tree = shallowRenderer.render(
    <MemoryRouter initialEntries={[{ key : 1 }]}>
      <LandingPageComponent />
    </MemoryRouter>
  )
  expect(tree).toMatchSnapshot()
})
