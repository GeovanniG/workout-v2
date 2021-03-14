import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseForm from './ExerciseForm';

const index = 0;

describe('default fields when app first loaded', () => {
  const placeholderVals: string[] = ['Exercise']
  test.each(placeholderVals)('renders input field with placeholder of "%s"', (placeholder) => {
    render(<ExerciseForm index={index} />);
    const linkElement = screen.getByLabelText(new RegExp(`^${placeholder}`, 'i'));
    expect(linkElement).toBeInTheDocument();
  });

  test('- icon is enabled', () => {
    render(<ExerciseForm index={index} />);
    
    const removeExerciseElement = screen.getByLabelText(/remove exercise/i);
    
    expect(removeExerciseElement).toBeEnabled();
  })
})

describe('input field', () => {
  const input: any[] = ['s', '1.0.1', 2.2, '$', '1=1', 'e1@'];
  it.each(input)('should accept only alphabetic characters, trying "%s"', (input) => {
    render(<ExerciseForm index={index} />);
    
    const inputField = screen.getByLabelText(/^exercise/i);
    userEvent.type(inputField,  input);
    
    expect(inputField).toHaveDisplayValue(/^[a-z]*$/i)
  })
})

