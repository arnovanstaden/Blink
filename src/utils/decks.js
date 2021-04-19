import { db } from "../config/firebase";

// Firestore Refs
const decksRef = db.collection('decks');

export const createDeck = async (data) => {
    const saveResult = await decksRef.add(data)
        .then((ref) => {
            return {
                id: ref.id,
                message: "Deck Saved Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return saveResult
}