import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseSet, { exerciseSetProps } from './ExerciseSet';

const placeholderVals: string[] = ['Weight', 'Reps']
const index = 0;

describe('default fields when app first loads', () => {
  test.each(placeholderVals)('renders input field with placeholder of "%s"', (placeholder) => {
    render(<ExerciseSet index={index} />);
    
    const inputElement = screen.getByLabelText(new RegExp(placeholder, 'i'));
    
    expect(inputElement).toBeInTheDocument();
  });

  test('- icon is enabled', () => {
    render(<ExerciseSet index={index} />);
    
    const removeSetElement = screen.getByLabelText(/remove set/i);
    
    expect(removeSetElement).toBeEnabled();
  })
})

describe.each(placeholderVals)('"%s" input field', (placeholder) => {
  const input: any[] = ['s', '1.0.1', 2.2, '$', '1=1', 9];
  it.each(input)('should accept only real numbers, trying "%s"', (input) => {
    render(<ExerciseSet index={index} />);
    
    const inputField = screen.getByLabelText(new RegExp(placeholder, 'i'));
    userEvent.type(inputField,  input);
    
    expect(inputField).toHaveDisplayValue(/^[0-9]*[.]?[0-9]*$/)
  })

  it('should not accept negative numbers', () => {
    render(<ExerciseSet index={index} />);
    const negativeNum: string = '-1';
    const positiveNum: string = `${Math.abs(parseFloat(negativeNum))}`;

    const inputField = screen.getByLabelText(new RegExp(placeholder, 'i'));
    userEvent.type(inputField, negativeNum);
    
    expect(inputField).toHaveDisplayValue(positiveNum);
  })
})

describe('weight options', () => {
  test("weight's input adornment should read lbs by default", () => {
    render(<ExerciseSet index={index} />)
    
    const adornment = screen.getByLabelText(/metric system/i);
    
    expect(adornment).toHaveTextContent('lbs');
  })

  const metrics: exerciseSetProps[] = [{weightSetting: 'lbs', index }, {weightSetting: 'kgs', index }, ];
  test.each(metrics)("weight's input adornment should match %s", ({weightSetting, index}) => {
    render(<ExerciseSet index={index} weightSetting={weightSetting} />)
    
    const adornment = screen.getByLabelText(/metric system/i);
    
    expect(adornment).toHaveTextContent(weightSetting!);
  })
})