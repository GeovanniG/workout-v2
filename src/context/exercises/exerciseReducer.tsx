import { exercise, partialExercise, exerciseAction, ExerciseActionKind } from './exerciseTypes';

const checkExercise = (exercise: partialExercise) => {
    if (exercise.name === undefined) throw new Error(`Provide an exercise name`);
}

function updatedExercise(oldExercise: exercise, newExercise: partialExercise): exercise {
    const createdExercise: exercise = {...oldExercise, ...newExercise};
    if (newExercise.name === undefined) createdExercise.name = oldExercise.name;
    return createdExercise;
}

function exerciseReducer(state: exercise[], action: exerciseAction): exercise[] {
    switch(action.type) {
        case ExerciseActionKind.ADD_EXERCISE: {
            if (!action.newExercise) throw new Error(`Provide the exercise to be added`);
            return [ ...state, action.newExercise ];
        }
        case ExerciseActionKind.REMOVE_EXERCISE: {
            if (!action.partialExercise) throw new Error(`Provide the exercise to be removed`);
            const exercise: partialExercise = action.partialExercise;
            const {index} = exercise;
            return state.filter(exercise => exercise.index !== index);
        }
        case ExerciseActionKind.UPDATE_EXERCISE: {
            if (!action.partialExercise) throw new Error(`Provide the exercise to be updated`);
            const partialExercise: partialExercise = action.partialExercise;
            // if (name === undefined) return state;
            checkExercise(partialExercise);
            return state.map(exercise => {
                if (exercise.index === partialExercise.index) return updatedExercise(exercise, partialExercise)
                return exercise;
            });
        }
        default: 
            throw new Error(`Unsupported action type: ${action.type}`)
    }
}

export { exerciseReducer };