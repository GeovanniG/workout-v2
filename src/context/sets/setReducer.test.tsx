import { setReducer } from './setReducer';
import { exerciseSet, setAction, ActionKind, partialSet } from './setTypes';

const initialState: exerciseSet[] = [{
    weight: 0,
    reps: 0,
    index: 0
}]

describe('Adding Sets', () => {
    const addSet = ActionKind.ADD_SET;

    test("adding a set to sets should increase set's count by 1", () => {
        const newSet: exerciseSet = {
            weight: 0,
            reps: 1,
            index: 0
        }
        const action: setAction = {
            type: addSet,
            newSet: newSet
        }

        const allSets: exerciseSet[] = setReducer(initialState, action);

        expect(allSets).toHaveLength(2);
    })

    test('providing no set to add should give an error', () => {
        const action: setAction = {
            type: addSet
            // No (partial) set is provided
        }
        
        expect(() => setReducer(initialState, action)).toThrowError(/provide .* set/i)
    })
})

describe('Removing Sets', () => {
    const removeSet = ActionKind.REMOVE_SET;

    test("removing a set from sets should decrease set's count by 1", () => {  
        const indexToRemove = initialState[0].index;
        const setToRemove: partialSet = { index: indexToRemove }
        const action: setAction = {
            type: removeSet,
            partialSet: setToRemove
        }

        const allSets: exerciseSet[] = setReducer(initialState, action)

        expect(allSets).toHaveLength(0);
    })

    test('providing no set to remove should give an error', () => {
        const action: setAction = {
            type: removeSet
            // No (partial) set is provided
        }
        
        expect(() => setReducer(initialState, action)).toThrowError(/provide .* set/i)
    })

    test('providing an incorrect index should not remove any sets', () => {
        const invalidIndexToRemove = -1;
        const setToRemove: partialSet = { index: invalidIndexToRemove }

        const action: setAction = {
            type: removeSet,
            partialSet: setToRemove
        }

        const allSets: exerciseSet[] = setReducer(initialState, action)

        expect(allSets).toHaveLength(1);
    })
})

describe("Updating Set's reps", () => {
    const updateSet = ActionKind.UPDATE_SET;

    test("updating set's reps to positive number should return set with updated reps", () => {
        const indexToUpdate = initialState[0].index;
        const updatedReps = 1;
        const setNewReps: partialSet = {
            index: indexToUpdate,
            reps: updatedReps
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewReps
        }

        const allSets: exerciseSet[] = setReducer(initialState, action);
        const {reps} = allSets[0];

        expect(reps).toEqual(updatedReps);
    })

    test("updating set's reps to 0 should return set with updated reps", () => {
        const nonzeroRepsInitialState: exerciseSet[] = [{
            index: 0,
            reps: 1,
            weight: 0
        }]
        const indexToUpdate = nonzeroRepsInitialState[0].index;
        const updatedReps = 0;
        const setNewReps: partialSet = {
            index: indexToUpdate,
            reps: updatedReps
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewReps
        }

        const allSets: exerciseSet[] = setReducer(nonzeroRepsInitialState, action);
        const {reps} = allSets[0];

        expect(reps).toEqual(updatedReps);
    })

    test("updating set's reps to negative number should give an error", () => {
        const indexToUpdate = initialState[0].index;
        const updatedReps = -1;
        const setNewReps: partialSet = {
            index: indexToUpdate,
            reps: updatedReps
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewReps
        }

        expect(() => setReducer(initialState, action)).toThrowError(/reps must be 0 or greater/i)
    })
})

describe("Updating Set's weight", () => {
    const updateSet = ActionKind.UPDATE_SET;

    test("updating set's weight to positive number should return set with updated weight", () => {
        const indexToUpdate = initialState[0].index;
        const updatedWeight = 1;
        const setNewWeight: partialSet = {
            index: indexToUpdate,
            weight: updatedWeight
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewWeight
        }

        const allSets: exerciseSet[] = setReducer(initialState, action);
        const {weight} = allSets[0];

        expect(weight).toEqual(updatedWeight);
    })

    test("updating set's weight to 0 should return set with updated weight", () => {
        const nonzeroRepsInitialState: exerciseSet[] = [{
            index: 0,
            reps: 0,
            weight: 1
        }]
        const indexToUpdate = nonzeroRepsInitialState[0].index;
        const updatedWeight = 0;
        const setNewWeight: partialSet = {
            index: indexToUpdate,
            weight: updatedWeight
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewWeight
        }

        const allSets: exerciseSet[] = setReducer(nonzeroRepsInitialState, action);
        const {weight} = allSets[0];

        expect(weight).toEqual(updatedWeight);
    })

    test("updating set's weight to negative number should give an error", () => {
        const indexToUpdate = initialState[0].index;
        const updatedWeight = -1;
        const setNewWeight: partialSet = {
            index: indexToUpdate,
            weight: updatedWeight
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewWeight
        }

        expect(() => setReducer(initialState, action)).toThrowError(/weight must be 0 or greater/i)
    })
})

describe('Updating sets other', () => {
    const updateSet = ActionKind.UPDATE_SET;

    test("updating set's weight and reps to positive numbers should return set with updated weight and reps", () => {
        const indexToUpdate = initialState[0].index;
        const updatedWeight = 1;
        const updatedReps = 1;
        const setNewWeightAndReps: partialSet = {
            index: indexToUpdate,
            weight: updatedWeight,
            reps: updatedReps
        }
        const action: setAction = {
            type: updateSet,
            partialSet: setNewWeightAndReps
        }

        const allSets: exerciseSet[] = setReducer(initialState, action);

        expect(allSets[0]).toEqual(setNewWeightAndReps);
    })

    test('providing no set to update should give an error', () => {
        const indexToUpdate = initialState[0].index;
        const updatedSetNoRepsOrWeight: partialSet = {
            index: indexToUpdate
        }
        const action: setAction = {
            type: updateSet,
            partialSet: updatedSetNoRepsOrWeight
        }
        
        expect(() => setReducer(initialState, action)).toThrowError(/provide reps or weight/i)
    })

    test('providing a set to update with no reps or weight should give an error', () => {
        const action: setAction = {
            type: updateSet
            // No (partial) set is provided
        }
        
        expect(() => setReducer(initialState, action)).toThrowError(/provide .* set/i)
    })

    test('providing an incorrect index should not update any sets', () => {
        const invalidIndexToUpdate = -1;
        const setToUpdate: partialSet = { index: invalidIndexToUpdate, weight: 1, reps: 1 }

        const action: setAction = {
            type: updateSet,
            partialSet: setToUpdate
        }

        const allSets: exerciseSet[] = setReducer(initialState, action)

        expect(allSets).toMatchObject(initialState);
    })
})