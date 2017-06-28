// import React from 'react'
// import LegislatorPageComponent from './../src/routes/legislator/LegislatorPageComponent'
// import ShallowRenderer from 'react-test-renderer/shallow'

// const shallowRenderer = new ShallowRenderer()


it.skip('renders correctly', () => {
  const tree = shallowRenderer
    .render(
        <LegislatorPageComponent/>
    )
  expect(tree).toMatchSnapshot()
})