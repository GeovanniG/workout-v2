interface exerciseSet extends partialSet {
    readonly index: string | number;
    weight: number | '';
    reps: number | '';
};

interface partialSet {
    readonly index: string | number;
    weight?: number | '';
    reps?: number | '';
}

enum ActionKind {
    ADD_SET = 'ADD_SET',
    REMOVE_SET = 'REMOVE_SET',
    UPDATE_SET = 'UPDATE_SET'
}

interface setAction {
    type: ActionKind;
    // set is used for adding a set
    newSet?: exerciseSet;
    // partialSet is used for removing a set
    // partialSet is used for updating a set
    partialSet?: partialSet;
}

type setStateDispatch = {
    state: exerciseSet[],
    dispatch: React.Dispatch<setAction>
}

export type { exerciseSet, partialSet, setAction, setStateDispatch };
export { ActionKind };