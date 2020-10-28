import axios from 'axios'

axios.timeout = 5000;
axios.interceptors.response.use(
  resp => {
    console.log('resp:', resp);
    return resp.data;
  }, err => {
    console.log('err:', err);
    return {
      data: {},
      errorMsg: err.statusText || 'Unknown Error',
      errorCode: -1
    };
  }
)

export default {
  get(url, params) {
    return axios({
      method: 'get',
      url, params,
    })
  },
  post(url, data) {
    return axios({
      method: 'post',
      url, data,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  },
}