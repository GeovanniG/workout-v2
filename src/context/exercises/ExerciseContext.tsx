import React from 'react';
import {exercise, exerciseStateDispatch} from './exerciseTypes';
import { v4 as uuidv4 } from 'uuid';
import { exerciseReducer } from './exerciseReducer';

const initialStateForNewExercises: () => exercise = ((): exercise => ({
    name: '',
    index: uuidv4()
}));
const initialState: exercise[] = [initialStateForNewExercises()];
const initialDispatch: React.Dispatch<any> = () => null;

const ExerciseContext = React.createContext<exerciseStateDispatch>({
    state: initialState,
    dispatch: initialDispatch
  });

function useExercises(exerciseContext: React.Context<exerciseStateDispatch> = ExerciseContext): exerciseStateDispatch {
    const context = React.useContext<exerciseStateDispatch>(exerciseContext); 
    return context;
}

interface providerProps {
    children: React.ReactElement
}

function ExerciseProvider({children}: providerProps) {
    const [state, dispatch] = React.useReducer(exerciseReducer, initialState);
    
    return (
        <ExerciseContext.Provider value={{state, dispatch}}>
            {children}
        </ExerciseContext.Provider>
    )
}

export {useExercises, ExerciseProvider, ExerciseContext, initialStateForNewExercises};