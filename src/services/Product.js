import axios from 'axios'

// const baseUrl = 'https://localhost:5001/api/products'
const baseUrl = 'https://northwindrestapi-olena-eyf2g4c5evdccmc7.canadacentral-01.azurewebsites.net/api/products'

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

const create = newProduct => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.post(baseUrl, newProduct, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = product => {
    const config = {
        headers: { Authorization: token }
    }
    return axios.put(`${baseUrl}/${product.productId}`, product, config)
}

const productService = {
  getAll,
  create,
  remove,
  update,
  setToken
};

export default productService;