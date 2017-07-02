import React from 'react'
import ResultsLayoutComponent from './../src/routes/legislator/ResultsLayoutComponent'
import ShallowRenderer from 'react-test-renderer/shallow'
import Renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

const shallowRenderer = new ShallowRenderer()

it('renders correctly', () => {
  const tree = shallowRenderer
    .render(
        <ResultsLayoutComponent/>
    )
  expect(tree).toMatchSnapshot()
})

const fakeData = {response : {data : {}}}
axios.get = jest.fn(()=>{
  return new Promise((resolve)=>{
    resolve(fakeData)
  })
});

it('requests legislator data depending on the address', ()=>{

  const tree = Renderer
    .create(
        <ResultsLayoutComponent match={{params : { address : 'fakeAddress'}}}/>
    )
  expect(tree).toMatchSnapshot()
  expect(axios.get.mock.calls.length).toBe(1)
  expect(axios.get.mock.calls[0][0]).toBe("http://localhost:4000/local-legislators")
  expect(axios.get.mock.calls[0][1]).toEqual({"params": {"address": "fakeAddress"}})


})