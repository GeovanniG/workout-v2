import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseForms from './ExerciseForms';
import {ExerciseProvider} from '../../context/exercises/ExerciseContext';

// We need the store for state and dispatch in useContext to take effect
const renderWithinProvider = (ui: React.ReactElement) => {
  return render(<ExerciseProvider>{ui}</ExerciseProvider>)
}

describe('default fields when app first loaded', () => {
  test('One exercise should be rendered by default', () => {
    renderWithinProvider(<ExerciseForms />);

    const exercises = screen.getByTestId(/exercises/i);
    
    expect(exercises).not.toBeEmptyDOMElement();
  })
})

describe('Add exercise', () => {
  test('Clicking add button once should add 1 exercise', () => {
    renderWithinProvider(<ExerciseForms />);
    
    const addButton = screen.getByLabelText(/add exercise/i);
    userEvent.click(addButton);
    const exercises = screen.getByTestId(/exercises/i);

    expect(exercises.children).toHaveLength(2);
  })

  test('Clicking add button twice should add 2 exercise', () => {
    renderWithinProvider(<ExerciseForms />);
    
    const addButton = screen.getByLabelText(/add exercise/i);
    userEvent.click(addButton);
    userEvent.click(addButton);
    const exercises = screen.getByTestId(/exercises/i);

    expect(exercises.children).toHaveLength(3);
  })
})

describe('Removing exercise', () => {
  test('Clicking remove button once should remove exercise', () => {
    renderWithinProvider(<ExerciseForms />);

    const removeexerciseButton = screen.getByLabelText(/remove exercise/i);
    userEvent.click(removeexerciseButton);
    const exercises = screen.queryByTestId(/exercises/i);

    expect(exercises).not.toBeInTheDocument();
  })

  test('Should be able to add and remove a exercise', () => {
    renderWithinProvider(<ExerciseForms />);

    const addButton = screen.getByLabelText(/add exercise/i);
    userEvent.click(addButton);
    const removeexerciseButton = screen.getAllByLabelText(/remove exercise/i);
    userEvent.click(removeexerciseButton[1]);
    const exercises = screen.getByTestId(/exercises/i);

    expect(exercises.children).toHaveLength(1);
  })

  test('Should be able to add and remove 2 exercises', () => {
    renderWithinProvider(<ExerciseForms />);

    const addButton = screen.getByLabelText(/add exercise/i);
    userEvent.click(addButton);
    const removeexerciseButton = screen.getAllByLabelText(/remove exercise/i);
    userEvent.click(removeexerciseButton[0]);
    userEvent.click(removeexerciseButton[1]);
    const exercises = screen.queryByTestId(/exercises/i);

    expect(exercises).not.toBeInTheDocument();
  })
})
