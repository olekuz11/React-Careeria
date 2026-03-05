import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomerAdd from './CustomerAdd'

jest.mock('./services/Customer')

test('CustomerAdd form renders correctly', () => {
  render(
    <CustomerAdd
      setLisäystila={jest.fn()}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const element = screen.getByText('Lisää asiakas')
  expect(element).toBeDefined()
})

test('CustomerAdd form has required input fields', () => {
  render(
    <CustomerAdd
      setLisäystila={jest.fn()}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const idInput = screen.getByPlaceholderText('ID (5 isoa kirjainta)')
  const companyInput = screen.getByPlaceholderText('Yrityksen nimi')
  expect(idInput).toBeDefined()
  expect(companyInput).toBeDefined()
})

test('Cancel button calls setLisäystila', () => {
  const mockSetLisäystila = jest.fn()
  render(
    <CustomerAdd
      setLisäystila={mockSetLisäystila}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const cancelButton = screen.getByDisplayValue('Peruuta')
  fireEvent.click(cancelButton)
  expect(mockSetLisäystila.mock.calls).toHaveLength(1)
})