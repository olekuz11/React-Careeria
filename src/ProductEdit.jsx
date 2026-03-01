import './App.css'
import React, { useState } from 'react'
import productService from './services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {

  const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
  const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
  const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
  const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedProduct = {
      productId: muokattavaProduct.productId,
      productName: newProductName,
      unitPrice: parseFloat(newUnitPrice),
      unitsInStock: parseInt(newUnitsInStock),
      discontinued: newDiscontinued,
      supplierId: muokattavaProduct.supplierId,
      categoryId: muokattavaProduct.categoryId,
      quantityPerUnit: muokattavaProduct.quantityPerUnit,
      unitsOnOrder: muokattavaProduct.unitsOnOrder,
      reorderLevel: muokattavaProduct.reorderLevel
    }

    productService.update(updatedProduct)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Muokattu tuotetta: ${updatedProduct.productName}`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollTo(0, 0)
          setTimeout(() => setShowMessage(false), 8000)
          setMuokkaustila(false)
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
      <h2>Muokkaa tuotetta</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label>Tuotteen nimi
          <input type="text" value={newProductName} placeholder="Tuotteen nimi" onChange={({ target }) => setNewProductName(target.value)} required />
        </label>
        <label>Hinta (€)
          <input type="number" step="0.01" value={newUnitPrice || ''} placeholder="Hinta" onChange={({ target }) => setNewUnitPrice(target.value)} />
        </label>
        <label>Varastossa
          <input type="number" value={newUnitsInStock || ''} placeholder="Varastossa" onChange={({ target }) => setNewUnitsInStock(target.value)} />
        </label>
        <label>Lopetettu
          <input type="checkbox" checked={newDiscontinued} onChange={({ target }) => setNewDiscontinued(target.checked)} />
        </label>

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setMuokkaustila(false)} />
        </div>
      </form>
    </div>
  )
}

export default ProductEdit