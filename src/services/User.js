import axios from 'axios'

const baseUrl = 'https://localhost:5001/api/users'

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

const create = newUser => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.post(baseUrl, newUser, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = user => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.put(`${baseUrl}/${user.userId}`, user, config)
}

export default { getAll, create, remove, update, setToken }