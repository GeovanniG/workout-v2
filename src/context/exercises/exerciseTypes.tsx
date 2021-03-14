enum ExerciseActionKind {
    ADD_EXERCISE = 'ADD_EXERCISE',
    REMOVE_EXERCISE = 'REMOVE_EXERCISE',
    UPDATE_EXERCISE = 'UPDATE_EXERCISE'
}

interface exercise extends partialExercise {
    readonly index: number | string;
    name: string;
}

interface partialExercise {
    readonly index: number | string;
    name?: string;
}

interface exerciseAction {
    type: ExerciseActionKind;
    newExercise?: exercise;   
    partialExercise?: partialExercise;
}

type exerciseStateDispatch = {
    state: exercise[],
    dispatch: React.Dispatch<exerciseAction>
}

export type { exercise, partialExercise, exerciseAction, exerciseStateDispatch };
export { ExerciseActionKind };