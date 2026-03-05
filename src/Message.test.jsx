import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Message from './Message'

test('Message component renders correctly', () => {
  render(<Message message="Test message" isPositive={true} />)
  const element = screen.getByText('Test message')
  expect(element).toBeDefined()
})

test('Message component renders negative message', () => {
  render(<Message message="Something went wrong" isPositive={false} />)
  const element = screen.getByText('Something went wrong')
  expect(element).toBeDefined()
})