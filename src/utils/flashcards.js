import firebase from "firebase/app";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// Firestore Refs
const userRef = db.collection('users');
const decksRef = (uid) => userRef.doc(uid).collection("decks");
const cardRef = (uid, deck_id, card_id) => decksRef(uid).doc(deck_id).collection("cards").doc(card_id)

// Operations
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export const getDeckCards = async (deck_id) => {
    const uid = await auth.currentUser.uid;

    const cardsQuerySnapshot = await decksRef(uid).doc(deck_id).collection("cards").get()
    const result = cardsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return result
}

export const createFlashcard = async (data) => {
    const uid = await auth.currentUser.uid;

    await decksRef(uid).doc(data.deck_id).update({
        cardCount: increment
    })

    const result = await decksRef(uid).doc(data.deck_id).collection("cards").add(data)
        .then((ref) => {
            return {
                ...data,
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

export const saveFlashcard = async (data) => {
    const uid = await auth.currentUser.uid;

    await cardRef(uid, data.deck_id, data.id).update(data)
    return {
        message: "FlashCard Updated Successfully"
    }
}

export const deleteFlashcard = async (data) => {
    const uid = await auth.currentUser.uid;

    const result = await cardRef(uid, data.deck_id, data.id).delete()
        .then(() => {
            return {
                message: "Flashcard Deleted Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })

    await decksRef(uid).doc(data.deck_id).update({
        cardCount: decrement
    })

    return result
}
