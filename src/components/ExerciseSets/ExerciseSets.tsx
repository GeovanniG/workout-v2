import { IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSets, initialStateForNewSets } from '../../context/sets/SetContext';
import ExerciseSet from '../ExerciseSet/ExerciseSet';
import { ActionKind } from '../../context/sets/setTypes';

const ExerciseSets = () => {
   const {state, dispatch} = useSets();

    return (
        <>
            {state.length ? (
                <div data-testid="sets">
                    {state.map(({index, reps, weight}) => <ExerciseSet initialReps={reps} initialWeight={weight} key={index} index={index} />)}
                </div>
            ) : <></>}
            <IconButton
                aria-label="Add Set" 
                onClick={() => dispatch({type: ActionKind.ADD_SET, newSet: initialStateForNewSets()})}
            >
                <AddCircleIcon titleAccess="Add Set"/>
            </IconButton>
        </>
   );
};

export default ExerciseSets;