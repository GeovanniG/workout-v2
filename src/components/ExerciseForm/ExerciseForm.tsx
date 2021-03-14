// import clsx from 'clsx';
import React from 'react';
import { TextField, FormControl, IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Fuse from 'fuse.js';
import ExerciseSetsWithStore from '../ExerciseSets/ExerciseSetsWithStore';
import { useExercises } from '../../context/exercises/ExerciseContext';
import { ExerciseActionKind } from '../../context/exercises/exerciseTypes';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';

type bodypart = 'chest' | 'lats' | 'shoulders' | 'traps' | 'biceps' | 'triceps' | 'forearms' | 'abdominals' | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves';

interface exercise {
  index: number | string;
  name: string;
  bodyparts: bodypart[];
}

const exercises: exercise[] = [{
  index: 0,
  name: 'squat',
  bodyparts: ['quadriceps', 'glutes']
}, {
  index: 1,
  name: 'deadlift',
  bodyparts: ['hamstrings', 'glutes', 'lats', 'traps', 'forearms']
}, {
  index: 2,
  name: 'bench',
  bodyparts: ['chest', 'triceps']
}]

interface exerciseFromProps {
  initialName?: string;
  index: string | number;
}

const isOnlyAlphabetic = (input: string) => {
  const regex = new RegExp("^[a-z]*$", 'i');
  return regex.test(input)
}

const filterOptions = createFilterOptions<exercise>({ limit: 6 });

const fuse = new Fuse<exercise>(exercises, {keys: ['name']});

const ExerciseForm = ({index, initialName=''}: exerciseFromProps) => {
    const [exercise, setExercise] = React.useState<string>(initialName);
    const { dispatch } = useExercises();

    return (
    <div>
      <FormControl component="fieldset">
          <Autocomplete
            autoSelect={true}
            onInputChange={(e, value) => isOnlyAlphabetic(value) ? setExercise(value) : ''}
            inputValue={exercise}
            options={exercises}
            // TODO: Implement groups: muscle groups and popluar
            // renderGroup={}
            // TODO: When no exercise found, display link allowing user to request exercise addition
            getOptionLabel={(option: exercise) => option.name}
            filterOptions={(options: exercise[], state: FilterOptionsState<exercise>): exercise[] =>
              state.inputValue ? fuse.search(state.inputValue).map(res => res.item) : filterOptions(options, state)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                // id="outlined-search" 
                label="Exercise" 
                type="search" 
                variant="outlined"
              />
            )}
          />
          <ExerciseSetsWithStore />
      </FormControl>
      <IconButton 
        aria-label="Remove Exercise"
        onClick={() => dispatch({ type: ExerciseActionKind.REMOVE_EXERCISE, partialExercise: {index} })}
      >
        <RemoveCircleIcon titleAccess="Remove Exercise"></RemoveCircleIcon>
      </IconButton>
    </div>
    )
  };

export default ExerciseForm;