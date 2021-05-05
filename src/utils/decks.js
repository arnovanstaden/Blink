import { db } from "../config/firebase";
import { auth } from "../config/firebase";


// Firestore Refs
const userRef = db.collection('users');
const decksRef = (uid) => userRef.doc(uid).collection("decks");

export const createDeck = async (data) => {
    const uid = await auth.currentUser.uid;
    data.uid = uid;
    data.cardCount = 0;

    const result = await decksRef(uid).add(data)
        .then((ref) => {
            return {
                id: ref.id,
                message: "Deck Created Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return result
}

export const saveDeck = async (data) => {
    const uid = await auth.currentUser.uid;
    data.uid = uid;
    await decksRef(uid).doc(data.id).update(data)
    return {
        id: data.id,
        message: "Deck Updated Successfully"
    }
}

export const getDeck = async (deck_id) => {
    const uid = await auth.currentUser.uid;

    const result = await decksRef(uid).doc(deck_id).get()
        .then((doc) => {
            if (!doc) {
                return undefined
            }
            return {
                id: doc.id,
                ...doc.data(),
            }
        });

    return result
}

export const getUserDecks = async () => {
    const uid = await auth.currentUser.uid
    const querySnapshot = await db.collectionGroup('decks').where('uid', '==', uid).get();
    const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return result
}

export const deleteDeck = async (deck_id) => {
    const uid = await auth.currentUser.uid;

    const result = await await decksRef(uid).doc(deck_id).delete()
        .then(() => {
            return {
                message: "Deck Deleted Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })

    return result
}