import './App.css'
import React, { useState, useEffect } from 'react'
import customerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({ setIsPositive, setMessage, setShowMessage }) => {
  const [customers, setCustomers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)

  useEffect(() => {
    customerService.getAll().then(data => setCustomers(data))
  }, [lisäystila])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2>Customers</h2>
        {!lisäystila && (
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

      <div className="posts-container">
        {customers && customers.map(c => (
          <Customer key={c.customerId} customer={c} />
        ))}
      </div>
    </>
  )
}

export default CustomerList