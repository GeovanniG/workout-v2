import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useSets } from '../../context/sets/SetContext';
import { ActionKind } from '../../context/sets/setTypes';

interface exerciseSetProps {
  weightSetting?: 'lbs' | 'kgs';
  initialWeight?: string | number;
  initialReps?: string | number;
  index: string | number;
}

const isRealNumber = (input: string) => {
  const regex = new RegExp("^[0-9]*[.]?[0-9]*$");
  return regex.test(input)
}

const ExerciseSet = ({weightSetting='lbs', initialWeight='', initialReps='', index}: exerciseSetProps) => {
  const [weight, setWeight] = React.useState<string | number>(initialWeight);
  const [reps, setReps] = React.useState<string | number>(initialReps);
  const {dispatch} = useSets();

  return (
  <div data-testid="set">
      <TextField
        label="Weight"
        id="outlined-start-adornment"
        // className={clsx(classes.margin, classes.textField)}
        InputProps={{
          endAdornment: <InputAdornment position="end" aria-label='metric system'>{weightSetting}</InputAdornment>,
        }}
        type="text"
        variant="outlined"
        value={weight}
        onChange={(e) => isRealNumber(e.target.value) ? setWeight(e.target.value) : ''}
      />

      <TextField 
        label="Reps" 
        id="outlined-search" 
        type="text" 
        variant="outlined"
        value={reps}
        onChange={(e) => isRealNumber(e.target.value) ? setReps(e.target.value) : ''} 
      />
      
      <IconButton 
        aria-label="Remove Set"
        onClick={() => dispatch({ type: ActionKind.REMOVE_SET, partialSet: {index} })}
      >
        <RemoveCircleIcon titleAccess="Remove Set"></RemoveCircleIcon>
      </IconButton>
  </div>
  );
}

export default ExerciseSet;
export type { exerciseSetProps }