import axios from 'axios'

const baseUrl = 'https://localhost:5001/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = user => {
    return axios.put(`${baseUrl}/${user.userId}`, user)
}

export default { getAll, create, remove, update }