import axios from 'axios'

// const baseUrl = 'https://localhost:5001/api/customers'
const baseUrl = 'https://northwindrestapi-olena-eyf2g4c5evdccmc7.canadacentral-01.azurewebsites.net/api/customers'

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

const create = newCustomer => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.post(baseUrl, newCustomer, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = customer => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.put(`${baseUrl}/${customer.customerId}`, customer, config)
}

export default { getAll, create, remove, update, setToken }