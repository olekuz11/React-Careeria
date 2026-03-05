import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductAdd from './ProductAdd'

jest.mock('./services/Product')

test('ProductAdd form renders correctly', () => {
  render(
    <ProductAdd
      setLisäystila={jest.fn()}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const element = screen.getByText('Lisää tuote')
  expect(element).toBeDefined()
})

test('ProductAdd form has required input fields', () => {
  render(
    <ProductAdd
      setLisäystila={jest.fn()}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const nameInput = screen.getByPlaceholderText('Tuotteen nimi')
  const priceInput = screen.getByPlaceholderText('Hinta')
  const stockInput = screen.getByPlaceholderText('Varastossa')
  expect(nameInput).toBeDefined()
  expect(priceInput).toBeDefined()
  expect(stockInput).toBeDefined()
})

test('Cancel button calls setLisäystila', () => {
  const mockSetLisäystila = jest.fn()
  render(
    <ProductAdd
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