import React from 'react';
import { useSets } from '../../../context/sets/SetContext';
import { setAction, setStateDispatch } from '../../../context/sets/setTypes';

type setProps =  setStateDispatch & setAction;

const ExerciseSet = ({state: initialState, dispatch: initialDispatch, type, partialSet, newSet}: setProps) => {
    const initialContext = React.createContext<setStateDispatch>({
        state: initialState,
        dispatch: initialDispatch
    })
    const {state, dispatch}: setStateDispatch = useSets(initialContext);

    return (
        <>
            {state && state.map(({index, weight, reps}) =>
                <div data-testid={`set-${index}`} key={index}>
                    <p data-testid={`index-${index}`}>{index}</p>
                    <p data-testid={`weight-${index}`}>{weight}</p>
                    <p data-testid={`reps-${index}`}>{reps}</p>
                </div>
            )}
            {console.log(state, dispatch({type, partialSet, newSet}))}
            <button data-testid="dispatch" onClick={() => dispatch({type, partialSet, newSet})} type="button">
                Dispatch
            </button>
        </>
    );
};

export default ExerciseSet;