import React from 'react'
import LandingPageComponent from './../src/routes/landing/LandingPageComponent'
import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import {MemoryRouter} from 'react-router'

it('renders correctly', () => {
  const tree = mount(
    <MemoryRouter initialEntries={[{ key : 1, pathname : '/' }]}>
      <LandingPageComponent />
    </MemoryRouter>
  )
  expect(toJSON(tree)).toMatchSnapshot()
})
