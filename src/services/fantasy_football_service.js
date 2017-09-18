import axios from 'axios'

const baseURL = "https://fantasy-football-api-1703.herokuapp.com"

const getData = (endpoint) => {
  return axios.get(baseURL + `/api/v1/${endpoint}.json`)
    .then(response => response.data)
    .catch(error => console.log(error))
}

export default getData