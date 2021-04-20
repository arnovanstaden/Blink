import { db } from "../config/firebase";
import { auth } from "../config/firebase";


// Firestore Refs
const decksRef = db.collection('decks');
const userRef = db.collection('users');

export const createDeck = async (data) => {
    const uid = await auth.currentUser.uid;
    data.uid = uid;

    const result = await userRef.doc(uid).collection("decks").add(data)
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
    return result
}



export const getDeck = async (deckID) => {
    const uid = await auth.currentUser.uid;

    const result = {}
    result.deck = await userRef.doc(uid).collection("decks").doc(deckID).get()
        .then((doc) => {
            if (!doc) {
                return undefined
            }
            return doc.data()
        });

    const cardsQuerySnapshot = await userRef.doc(uid).collection("decks").doc(deckID).collection("cards").get()
    result.cards = cardsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    console.log(result.cards)
    return result
}

export const getUserDecks = async () => {
    const uid = await auth.currentUser.uid
    console.log(uid)
    const querySnapshot = await db.collectionGroup('decks').where('uid', '==', uid).get();
    const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return result
}