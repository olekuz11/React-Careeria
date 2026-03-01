import './App.css'
import React, { useState, useEffect } from 'react'
import productService from './services/Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({ setIsPositive, setMessage, setShowMessage, accessLevel }) => {
  const [products, setProducts] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState(null)
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    productService.getAll().then(data => setProducts(data))
  }, [lisäystila, reload, muokkaustila])

  const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkaustila(true)
  }

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove product ${product.productName}?`)
    if (vastaus === true) {
      productService.remove(product.productId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Successfully removed ${product.productName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollTo(0, 0)
            setTimeout(() => setShowMessage(false), 8000)
            setReload(!reload)
          }
        })
        .catch(error => {
          setMessage(error.message)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollTo(0, 0)
          setTimeout(() => setShowMessage(false), 8000)
        })
    }
  }

  const filtered = products
    .filter(p => p.productName.toLowerCase().indexOf(search) > -1)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2>Tuotteet</h2>
        {!lisäystila && !muokkaustila && (
          <button onClick={() => setLisäystila(true)}>Lisää uusi</button>
        )}
      </div>

      {lisäystila && (
        <ProductAdd
          setLisäystila={setLisäystila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
        />
      )}

      {muokkaustila && muokattavaProduct && (
        <ProductEdit
          setMuokkaustila={setMuokkaustila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          muokattavaProduct={muokattavaProduct}
        />
      )}

      {!lisäystila && !muokkaustila && (
        <>
          <input
            className="search-input"
            placeholder="Hae tuotteen nimellä..."
            value={search}
            onChange={handleSearchInputChange}
          />
          <table className="user-table-full">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Hinta</th>
                <th>Varastossa</th>
                <th>Lopetettu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.productId}>
                  <td>{p.productName}</td>
                  <td>{p.unitPrice} €</td>
                  <td>{p.unitsInStock}</td>
                  <td>{p.discontinued ? 'Kyllä' : 'Ei'}</td>
                  <td>
                    {accessLevel === 1 && (
                      <>
                        <button onClick={() => editProduct(p)}>Edit</button>
                        <button onClick={() => deleteProduct(p)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default ProductList