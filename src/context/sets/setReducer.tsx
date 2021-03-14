import {exerciseSet, ActionKind, setAction, partialSet} from './setTypes';

const checkSet = (set: partialSet) => {
    if (set.reps && set.reps < 0) throw new Error(`Reps must be 0 or greater`);
    if (set.weight && set.weight < 0) throw new Error(`Weight must be 0 or greater`);
    if ((set.reps === undefined) && (set.weight === undefined)) throw new Error('Provide reps or weight')
}

function updatedSet(oldSet: exerciseSet, newSet: partialSet): exerciseSet {
    const createdSet: exerciseSet = {...oldSet, ...newSet};
    if (newSet.weight === undefined) createdSet.weight = oldSet.weight;
    if (newSet.reps === undefined) createdSet.reps = oldSet.reps;
    return createdSet;
}

function setReducer(state: exerciseSet[], action: setAction): exerciseSet[] {
    switch(action.type) {
        case ActionKind.ADD_SET: {
            if (!action.newSet) throw new Error(`Provide the set to be added`);
            return [ ...state, action.newSet! ];
        }
        case ActionKind.REMOVE_SET: {
            if (!action.partialSet) throw new Error(`Provide the set to be removed`);
            const set: partialSet = action.partialSet
            const {index} = set;
            return state.filter(set => set.index !== index);
        }
        case ActionKind.UPDATE_SET: {
            if (!action.partialSet) throw new Error(`Provide the set to be updated`);
            const partialSet: partialSet = action.partialSet
            checkSet(partialSet);
            return state.map(set => {
                if (set.index === partialSet.index) return updatedSet(set, partialSet)
                return set;
            });
        }
        default: 
            throw new Error(`Unsupported action type: ${action.type}`)
    }
}

export { setReducer };