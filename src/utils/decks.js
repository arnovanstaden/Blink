import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import firebase from "firebase/app";

// Firestore Refs
const userRef = db.collection('users');
const decksRef = (uid) => userRef.doc(uid).collection("decks");

// Operations
const increment = (value) => firebase.firestore.FieldValue.increment(value);


// CRUD
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

export const saveProgress = async (deck) => {
    console.log(deck)
    const uid = await auth.currentUser.uid;
    await decksRef(uid).doc(deck.id).update({
        "stats.timesLearned": increment(1),
        "stats.cardsStudied": increment(deck.cardCount)
    })
    return {
        message: "Progress saved"
    }
}


// ----------------------------------
// General

export const getTotalCardsStudied = (decks) => {
    const total = decks.reduce((acc, deck) => acc + (deck.stats ? deck.stats.cardsStudied : 0), 0)
    return total
}