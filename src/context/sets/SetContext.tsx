import React from 'react';
import {exerciseSet, setStateDispatch} from './setTypes';
import { v4 as uuidv4 } from 'uuid';
import {setReducer} from './setReducer';

const initialStateForNewSets: () => exerciseSet = ((): exerciseSet => ({
    weight: '',
    reps: '',
    index: uuidv4()
}));
const initialState: exerciseSet[] = [initialStateForNewSets()];
const initialDispatch: React.Dispatch<any> = () => null;

const SetContext = React.createContext<setStateDispatch>({
    state: initialState,
    dispatch: initialDispatch
  });

function useSets(setContext: React.Context<setStateDispatch> = SetContext): setStateDispatch {
    const context = React.useContext<setStateDispatch>(setContext); 
    return context;
}

interface providerProps {
    children: React.ReactElement
}

function SetProvider({children}: providerProps) {
    const [state, dispatch] = React.useReducer(setReducer, initialState);
    
    return (
        <SetContext.Provider value={{state, dispatch}}>
            {children}
        </SetContext.Provider>
    )
}

export {useSets, SetProvider, SetContext, initialStateForNewSets};