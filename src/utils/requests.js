import axios from 'axios'

axios.interceptors.response.use(
    resp => {
      console.log('resp:', resp.data);
      return resp.data;
    }, err => {
      console.log('err:', err.data);
      return err.data;
    }
)

export default {
  get(url, params) {
    return axios({
      method: 'get',
      url, params,
      timeout: 30000
    })
  }
}