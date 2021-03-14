// import ExerciseSet from '../components/ExerciseSet/ExerciseSet';
import ExerciseSets from './ExerciseSets';
import { SetProvider } from '../../context/sets/SetContext';

const ExerciseSetsWithStore = () => (
    <SetProvider>
        <ExerciseSets />
    </SetProvider>
);

export default ExerciseSetsWithStore;