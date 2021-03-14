import { IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExerciseForm from '../ExerciseForm/ExerciseForm';
import { useExercises, initialStateForNewExercises } from '../../context/exercises/ExerciseContext';
import { ExerciseActionKind} from '../../context/exercises/exerciseTypes';

const ExerciseForms = () => {
    const {state, dispatch} = useExercises();

    return (
        <>
            {state.length ? (
                <div data-testid="exercises">
                    {state.map(({index, name}) => <ExerciseForm initialName={name} key={index} index={index} />)}
                </div>
            ) : <></>}
            <IconButton
                aria-label="Add Exercise" 
                onClick={() => dispatch({type: ExerciseActionKind.ADD_EXERCISE, newExercise: initialStateForNewExercises()})}
            >
                <AddCircleIcon titleAccess="Add Exercise"/>
            </IconButton>
        </>
   );
}

export default ExerciseForms;