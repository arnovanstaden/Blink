import { db } from "../config/firebase";
import { auth } from "../config/firebase";


// Firestore Refs
const userRef = db.collection('users');
const decksRef = (uid) => userRef.doc(uid).collection("decks");

export const createFlashcard = async (data) => {
    const uid = await auth.currentUser.uid;
    console.log(data)

    const result = await decksRef(uid).doc(data.deckid).collection("cards").add(data)
        .then((ref) => {
            return {
                id: ref.id,
                message: "Flashcard Saved Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return result
}
