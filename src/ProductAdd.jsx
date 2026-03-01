import './App.css'
import React, { useState } from 'react'
import productService from './services/Product'

const ProductAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

  const [newProductName, setNewProductName] = useState('')
  const [newUnitPrice, setNewUnitPrice] = useState('')
  const [newUnitsInStock, setNewUnitsInStock] = useState('')
  const [newDiscontinued, setNewDiscontinued] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newProduct = {
      productName: newProductName,
      unitPrice: parseFloat(newUnitPrice),
      unitsInStock: parseInt(newUnitsInStock),
      discontinued: newDiscontinued,
      supplierId: null,
      categoryId: null,
      quantityPerUnit: null,
      unitsOnOrder: 0,
      reorderLevel: 0
    }

    productService.create(newProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Lisätty uusi tuote: ${newProduct.productName}`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollTo(0, 0)
          setTimeout(() => setShowMessage(false), 8000)
          setLisäystila(false)
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

  return (
    <div className="post-card" style={{ maxWidth: '400px', margin: '16px auto' }}>
      <h2>Lisää tuote</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label>Tuotteen nimi
          <input type="text" value={newProductName} placeholder="Tuotteen nimi" onChange={({ target }) => setNewProductName(target.value)} required />
        </label>
        <label>Hinta (€)
          <input type="number" step="0.01" value={newUnitPrice} placeholder="Hinta" onChange={({ target }) => setNewUnitPrice(target.value)} />
        </label>
        <label>Varastossa
          <input type="number" value={newUnitsInStock} placeholder="Varastossa" onChange={({ target }) => setNewUnitsInStock(target.value)} />
        </label>
        <label>Lopetettu
          <input type="checkbox" checked={newDiscontinued} onChange={({ target }) => setNewDiscontinued(target.checked)} />
        </label>

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setLisäystila(false)} />
        </div>
      </form>
    </div>
  )
}

export default ProductAdd