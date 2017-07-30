
import axios from 'axios'

export default function getFromScorecardBackend (urlFragment, callingComponent) {
  let apiEndpoint
  if (process.env.NODE_ENV === 'production') {
    apiEndpoint = 'https://progressive-mass.herokuapp.com'
  } else {
    apiEndpoint = 'http://localhost:4000'
  }

  // FIXME This join should be done with a URL constructor, not by hand
  let request = `${apiEndpoint}${urlFragment}`

  axios.get(request)
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
