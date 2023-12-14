import axios from 'axios'

const pathUrl = {
  menu: 'menu'
}

export const callAPI = async(endpoint, method, headers, data) => {
  const baseURL = 'http://localhost:8000/api/'
  const options = {
    baseURL,
    url: endpoint,
    method,
    headers,
    data
  }

  const response = await axios(options)
  return response?.data
}

// Menu
export const getAllMenu = () => {
  return callAPI(`${pathUrl.menu}/all`, 'GET')
}
export const createMenu = (dataMenu) => {
  return callAPI(`${pathUrl.menu}/create`, 'POST', {}, dataMenu)
}
