import {db, auth} from '../firebase';
import firebase from 'firebase';

export function addWorkout(workout){
           let date = new Date().toISOString().split('T')[0];
           db
            .collection('users')
            .doc(auth.currentUser.uid)
            .collection('workout')
            .set({
                    exName: workout.name,
                    Weight: workout.Weight,
                    duration: workout.duration,
                    numReps: workout.numReps,
                    numSets: workout.numSets,
                    rating: workout.rating,

            })
            .then((data) => console.log("Successfully added"))
            .catch((error) => console.log(error));

}