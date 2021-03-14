import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useExercises } from './ExerciseContext';
import {exercise, exerciseAction, exerciseStateDispatch, ExerciseActionKind} from './exerciseTypes'

const initialState: exercise[] = [{
    index: 0,
    name: ''
}];
const initialDispatch = () => null;
const ExerciseContext = React.createContext<exerciseStateDispatch>({
    state: initialState,
    dispatch: initialDispatch
  });


describe('useExercises should return correct context', () => {
    test('useExercises returns correct initial state', () => {
        const {result} = renderHook(() => useExercises(ExerciseContext));
        const {state} : exerciseStateDispatch = result.current;

        expect(state).toMatchObject(initialState);
    })

    test('useExercises returns correct initial dispatch', () => {
        // choice of action is irrelevant
        const action: exerciseAction = {
            type: ExerciseActionKind.ADD_EXERCISE
        };

        const {result} = renderHook(() => useExercises(ExerciseContext));
        const {dispatch} : exerciseStateDispatch = result.current;

        expect(dispatch(action)).toBeNull();
    })
})