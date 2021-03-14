import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseSets from './ExerciseSets';
import {SetProvider} from '../../context/sets/SetContext';

// We need the store for state and dispatch in useContext to take effect
const renderWithinProvider = (ui: React.ReactElement) => {
  return render(<SetProvider>{ui}</SetProvider>)
}

describe('default fields when app first loaded', () => {
  test('One exercise set should be rendered by default', () => {
    renderWithinProvider(<ExerciseSets />);

    const sets = screen.getByTestId(/sets/i);
    
    expect(sets).not.toBeEmptyDOMElement();
  })
})

describe('Add set', () => {
  test('Clicking add button once should add 1 set', () => {
    renderWithinProvider(<ExerciseSets />);
    
    const addButton = screen.getByLabelText(/add set/i);
    userEvent.click(addButton);
    const sets = screen.getByTestId(/sets/i);

    expect(sets.children).toHaveLength(2);
  })

  test('Clicking add button twice should add 2 set', () => {
    renderWithinProvider(<ExerciseSets />);
    
    const addButton = screen.getByLabelText(/add set/i);
    userEvent.click(addButton);
    userEvent.click(addButton);
    const sets = screen.getByTestId(/sets/i);

    expect(sets.children).toHaveLength(3);
  })
})

describe('Removing set', () => {
  test('Clicking remove button once should remove set', () => {
    renderWithinProvider(<ExerciseSets />);

    const removeSetButton = screen.getByLabelText(/remove set/i);
    userEvent.click(removeSetButton);
    const sets = screen.queryByTestId(/sets/i);

    expect(sets).not.toBeInTheDocument();
  })

  test('Should be able to add and remove a set', () => {
    renderWithinProvider(<ExerciseSets />);

    const addButton = screen.getByLabelText(/add set/i);
    userEvent.click(addButton);
    const removeSetButton = screen.getAllByLabelText(/remove set/i);
    userEvent.click(removeSetButton[1]);
    const sets = screen.getByTestId(/sets/i);

    expect(sets.children).toHaveLength(1);
  })

  test('Should be able to add and remove 2 sets', () => {
    renderWithinProvider(<ExerciseSets />);

    const addButton = screen.getByLabelText(/add set/i);
    userEvent.click(addButton);
    const removeSetButton = screen.getAllByLabelText(/remove set/i);
    userEvent.click(removeSetButton[0]);
    userEvent.click(removeSetButton[1]);
    const sets = screen.queryByTestId(/sets/i);

    expect(sets).not.toBeInTheDocument();
  })
})
