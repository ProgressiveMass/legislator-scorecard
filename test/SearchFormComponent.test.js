import React from 'react'
import {
  SearchFormComponent
} from './../src/routes/landing/search/SearchFormComponent'
import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

it('renders correctly', () => {
  const tree = shallow(<SearchFormComponent />)
  expect(toJSON(tree)).toMatchSnapshot()
})

function createNodeMock () {
  // You can return anything from this function.
  // For example:
  return {
    focus () {
      // Do nothing
    }
  }
}

it('allows you to submit the form', () => {
  const onFormSubmit = jest.spyOn(SearchFormComponent.prototype, 'onFormSubmit')
  const history = []
  const wrapper = mount(<SearchFormComponent history={history} />)

  wrapper.find('input[name="address"]').node.value = '123 Main St'
  wrapper.find('input[name="zipCode"]').node.value = '02139'

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(onFormSubmit).toHaveBeenCalled()
  expect(history[0]).toBe('/my-legislators/123 Main St MA 02139')
})
