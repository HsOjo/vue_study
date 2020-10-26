let host = '192.168.185.2:8088'
let url_base = 'http://' + host + '/shopping';
let v1 = url_base + '/api/v1'

export default {
  BASE: url_base,
  CONTACT_LIST: v1 + '/catalog/category/condition',
}