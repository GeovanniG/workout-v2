import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useSets } from './SetContext';
import {exerciseSet, setAction, setStateDispatch, ActionKind} from './setTypes'

const initialState: exerciseSet[] = [{
    index: 0,
    weight: 0,
    reps: 0
}];
const initialDispatch = () => null;
const SetContext = React.createContext<setStateDispatch>({
    state: initialState,
    dispatch: initialDispatch
  });


describe('useSets should return correct context', () => {
    test('useSets returns correct initial state', () => {
        const {result} = renderHook(() => useSets(SetContext));
        const {state} : setStateDispatch = result.current;

        expect(state).toMatchObject(initialState);
    })

    test('useSets returns correct initial dispatch', () => {
        // choice of action is irrelevant
        const action: setAction = {
            type: ActionKind.ADD_SET
        };

        const {result} = renderHook(() => useSets(SetContext));
        const {dispatch} : setStateDispatch = result.current;

        expect(dispatch(action)).toBeNull();
    })
})