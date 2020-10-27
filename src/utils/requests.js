import axios from 'axios'

axios.interceptors.response.use(
    resp => {
      console.log('resp:', resp.data);
      return resp;
    }, err => {
      console.log('err:', err.data);
      return err;
    }
)

export default {
  get(url, params) {
    return axios({
      method: 'get',
      url, params,
      timeout: 30000
    })
  },
  post(url, data) {
    return axios({
      method: 'post',
      url, data,
      timeout: 30000,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  },
}