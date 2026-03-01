import './App.css'
import React, { useState, useEffect } from 'react'
import customerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({ setIsPositive, setMessage, setShowMessage, accessLevel }) => {
  const [customers, setCustomers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState(null)
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    customerService.getAll().then(data => setCustomers(data))
  }, [lisäystila, reload, muokkaustila])

  const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
  }

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2>Customers</h2>
        {!lisäystila && !muokkaustila && (
          <button onClick={() => setLisäystila(true)}>Lisää uusi</button>
        )}
      </div>

      {lisäystila && (
        <CustomerAdd
          setLisäystila={setLisäystila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
        />
      )}

      {muokkaustila && muokattavaCustomer && accessLevel === 1 && (
        <CustomerEdit
          setMuokkaustila={setMuokkaustila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          muokattavaCustomer={muokattavaCustomer}
        />
      )}

      {!lisäystila && !muokkaustila && (
        <>
          <input
            className="search-input"
            placeholder="Hae yrityksen nimellä..."
            value={search}
            onChange={handleSearchInputChange}
          />
          <div className="posts-container">
            {customers && customers
              .filter(c => c.companyName.toLowerCase().indexOf(search) > -1)
              .map(c => (
                <Customer
                  key={c.customerId}
                  customer={c}
                  setIsPositive={setIsPositive}
                  setMessage={setMessage}
                  setShowMessage={setShowMessage}
                  reload={reload}
                  reloadNow={setReload}
                  editCustomer={editCustomer}
                  accessLevel={accessLevel}
                />
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default CustomerList