import axios from 'axios'

const baseUrl = 'https://localhost:5001/api/customers'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = customer => {
    return axios.put(`${baseUrl}/${customer.customerId}`, customer)
}

export default { getAll, create, remove, update }