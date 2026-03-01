import axios from 'axios'

// const baseUrl = 'https://localhost:5001/api/employees'
const baseUrl = 'https://northwindrestapi-olena-eyf2g4c5evdccmc7.canadacentral-01.azurewebsites.net/api/employees'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newEmployee => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.post(baseUrl, newEmployee, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = employee => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.put(`${baseUrl}/${employee.employeeId}`, employee, config)
}

const employeeService = {
  getAll,
  create,
  remove,
  update,
  setToken
};

export default employeeService;