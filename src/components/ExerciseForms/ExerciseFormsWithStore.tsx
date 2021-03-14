// import ExerciseSet from '../components/ExerciseSet/ExerciseSet';
import ExerciseForms from './ExerciseForms';
import { ExerciseProvider } from '../../context/exercises/ExerciseContext';

const ExerciseSetsWithStore = () => (
    <ExerciseProvider>
        <ExerciseForms />
    </ExerciseProvider>
);

export default ExerciseSetsWithStore;