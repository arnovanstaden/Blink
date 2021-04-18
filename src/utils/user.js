import { db } from "../config/firebase";

// Firestore Refs
const usersRef = db.collection('users');

export const createDbUser = async (newUser) => {
    const uid = newUser.uid;
    delete newUser.uid
    const saveResult = await usersRef.doc(uid).set(newUser)
        .then((result) => {
            return result
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return saveResult
}

