import './App.css'
import React, { useState } from 'react'
import customerService from './services/Customer'

const CustomerEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer }) => {

  const [newCustomerId] = useState(muokattavaCustomer.customerId)
  const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
  const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
  const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)
  const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
  const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
  const [newCity, setNewCity] = useState(muokattavaCustomer.city)
  const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
  const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
  const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedCustomer = {
      customerId: newCustomerId,
      companyName: newCompanyName,
      contactName: newContactName,
      contactTitle: newContactTitle,
      country: newCountry,
      address: newAddress,
      city: newCity,
      postalCode: newPostalCode,
      phone: newPhone,
      fax: newFax
    }

    customerService.update(updatedCustomer)
      .then(response => {
        if (response.status === 200) {
          setMessage('Muokattu asiakasta: ' + updatedCustomer.companyName)
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
      <h2>Muokkaa asiakasta</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <input type="text" value={newCustomerId} disabled style={{ opacity: 0.5 }} />
        <input type="text" value={newCompanyName} placeholder="Yrityksen nimi" onChange={({ target }) => setNewCompanyName(target.value)} required />
        <input type="text" value={newContactName || ''} placeholder="Yhteyshenkilö" onChange={({ target }) => setNewContactName(target.value)} />
        <input type="text" value={newContactTitle || ''} placeholder="Titteli" onChange={({ target }) => setNewContactTitle(target.value)} />
        <input type="text" value={newCountry || ''} placeholder="Maa" onChange={({ target }) => setNewCountry(target.value)} />
        <input type="text" value={newAddress || ''} placeholder="Osoite" onChange={({ target }) => setNewAddress(target.value)} />
        <input type="text" value={newCity || ''} placeholder="Kaupunki" onChange={({ target }) => setNewCity(target.value)} />
        <input type="text" value={newPostalCode || ''} placeholder="Postinumero" onChange={({ target }) => setNewPostalCode(target.value)} />
        <input type="text" value={newPhone || ''} placeholder="Puhelin" onChange={({ target }) => setNewPhone(target.value)} />
        <input type="text" value={newFax || ''} placeholder="Faksi" onChange={({ target }) => setNewFax(target.value)} />

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setMuokkaustila(false)} />
        </div>
      </form>
    </div>
  )
}

export default CustomerEdit