import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Customer from './Customer'

jest.mock('./services/Customer')

const mockCustomer = {
  customerId: 'ALFKI',
  companyName: 'Alfreds Futterkiste',
  contactName: 'Maria Anders',
  contactTitle: 'Sales Representative',
  phone: '030-0074321',
  address: 'Obere Str. 57',
  city: 'Berlin',
  country: 'Germany'
}

test('Customer component renders company name', () => {
  render(
    <Customer
      customer={mockCustomer}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
      reload={false}
      reloadNow={jest.fn()}
      editCustomer={jest.fn()}
      accessLevel={2}
    />
  )
  const element = screen.getByText('Alfreds Futterkiste')
  expect(element).toBeDefined()
})

test('Edit and Delete buttons are visible for accessLevel 1', () => {
  render(
    <Customer
      customer={mockCustomer}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
      reload={false}
      reloadNow={jest.fn()}
      editCustomer={jest.fn()}
      accessLevel={1}
    />
  )
  const card = screen.getByText('Alfreds Futterkiste')
  fireEvent.click(card)
  expect(screen.getByText('Edit')).toBeDefined()
  expect(screen.getByText('Delete')).toBeDefined()
})