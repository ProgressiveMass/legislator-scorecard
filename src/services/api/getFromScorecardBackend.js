
import axios from 'axios'

export default function getFromScorecardBackend (url, callingComponent) {
  // FIXME this works weird in non-dev if REACT_APP_ENV is undefined
  let apiEndpoint
  if (process.env.REACT_APP_ENV === 'test') {
    apiEndpoint = 'https://progressive-mass-test.herokuapp.com'
  } else if (process.env.NODE_ENV === 'production') {
    apiEndpoint = 'https://progressive-mass.herokuapp.com'
  } else {
    apiEndpoint = 'http://localhost:4000'
  }

  // FIXME Need to handle query params in the URL
  const axiosConfig = {
    baseURL: apiEndpoint
  }

  axios.get(url, axiosConfig)
    .then((response) => {
      callingComponent.setState({
        apiData: response.data
      })
    }, (error) => {
      if (error.response) {
        callingComponent.setState({ error: error.response.data, data: {} })
      } else {
        callingComponent.setState({ error: error.message, data: {} })
      }
      console.log(error.message)
    })
}
