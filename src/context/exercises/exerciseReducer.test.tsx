import { exerciseReducer } from './exerciseReducer';
import { exercise, exerciseAction, ExerciseActionKind, partialExercise } from './exerciseTypes';

const initialState: exercise[] = [{
    index: 0,
    name: ''
}]

describe('Add exercises', () => {
    const addExercise = ExerciseActionKind.ADD_EXERCISE;

    test("adding an exercise should increase execise count by 1", () => {
        const newExercise: exercise = {
            index: 1,
            name: 'a'
        };
        const action: exerciseAction = {
            type: addExercise,
            newExercise
        }

        const exercises = exerciseReducer(initialState, action)

        expect(exercises).toHaveLength(2);
    })

    test('providing no exercise should throw an error', () => {
        const action: exerciseAction = {
            type: addExercise
            // no new exercise is added
        }

        expect(() => exerciseReducer(initialState, action)).toThrowError(/provide the exercise to be added/i);
    })
})

describe('Remove exercises', () => {
    const removeExercise = ExerciseActionKind.REMOVE_EXERCISE;

    test('removing an exercise should decrease count by 1', () => {
        const indexToRemove = initialState[0].index;
        const exerciseToRemove: partialExercise = { index: indexToRemove }
        const action: exerciseAction = {
            type: removeExercise,
            partialExercise: exerciseToRemove
        }

        const exercises = exerciseReducer(initialState, action)

        expect(exercises).toHaveLength(0);        
    })

    test('providing no exercise to remove should give an error', () => {
        const action: exerciseAction = {
            type: removeExercise,
        }
    
        expect(() => exerciseReducer(initialState, action)).toThrowError(/provide the exercise to be removed/i);
    })

    test('providing an incorrect index should not remove any exercise', () => {
        const invalidIndexToRemove = -1;
        const exerciseToRemove: partialExercise = { index: invalidIndexToRemove }
        const action: exerciseAction = {
            type: removeExercise,
            partialExercise: exerciseToRemove
        }

        const exercises = exerciseReducer(initialState, action)

        expect(exercises).toHaveLength(1);    

    })
})

describe('Updating exercises', () => {
    const updateExercise = ExerciseActionKind.UPDATE_EXERCISE;

    test("updating an exercise's name should return exercise with new name", () => {
        const newExerciseName = 'a';
        const indexToUpdate = initialState[0].index;
        const exerciseToUpdate: partialExercise = {
            index: indexToUpdate,
            name: newExerciseName
        }
        const action: exerciseAction = {
            type: updateExercise,
            partialExercise: exerciseToUpdate
        }

        const [exercises] = exerciseReducer(initialState, action);

        expect(exercises).toMatchObject(exerciseToUpdate);
    })

    test('providing no new exercise should give an error', () => {        
        const action: exerciseAction = {
            type: updateExercise,
        }

        expect(() => exerciseReducer(initialState, action)).toThrowError(/provide .* exercise/i);    
    })

    test('providing no exercise name should give an error', () => {    
        const indexToUpdate = initialState[0].index;
        const exerciseToUpdate: partialExercise = {
            index: indexToUpdate
        }    
        const action: exerciseAction = {
            type: updateExercise,
            partialExercise: exerciseToUpdate
        }

        expect(() => exerciseReducer(initialState, action)).toThrowError(/provide an exercise name/i);    
    })

    test('providing an incorrect index should not update any exercises', () => {
        const newExerciseName = 'a';
        const invalidIndexToUpdate = -1;
        const exerciseToUpdate: partialExercise = {
            index: invalidIndexToUpdate,
            name: newExerciseName
        }
        const action: exerciseAction = {
            type: updateExercise,
            partialExercise: exerciseToUpdate
        }

        const exercises = exerciseReducer(initialState, action);

        expect(exercises).toMatchObject(initialState);
    })
})