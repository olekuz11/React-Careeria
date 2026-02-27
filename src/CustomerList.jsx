import './App.css'
import React, { useState, useEffect } from 'react'
import customerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({ setIsPositive, setMessage, setShowMessage }) => {
  const [customers, setCustomers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    customerService.getAll().then(data => setCustomers(data))
  }, [lisäystila, reload, muokkaustila])

  const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
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

      {muokkaustila && muokattavaCustomer && (
        <CustomerEdit
          setMuokkaustila={setMuokkaustila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          muokattavaCustomer={muokattavaCustomer}
        />
      )}

      <div className="posts-container">
        {customers && customers.map(c => (
          <Customer
            key={c.customerId}
            customer={c}
            setIsPositive={setIsPositive}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            reload={reload}
            reloadNow={setReload}
            editCustomer={editCustomer}
          />
        ))}
      </div>
    </>
  )
}

export default CustomerList