import firebase from "firebase/app";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// Firestore Refs
const userRef = db.collection('users');
const decksRef = (uid) => userRef.doc(uid).collection("decks");
const cardRef = (uid, deckid, cardid) => decksRef(uid).doc(deckid).collection("cards").doc(cardid)

// Operations
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export const createFlashcard = async (data) => {
    const uid = await auth.currentUser.uid;

    await decksRef(uid).doc(data.deckid).update({
        cardCount: increment
    })

    const result = await decksRef(uid).doc(data.deckid).collection("cards").add(data)
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

    await cardRef(uid, data.deckid, data.id).update(data)
    return {
        message: "FlashCard Updated Successfully"
    }
}

export const deleteFlashcard = async (data) => {
    const uid = await auth.currentUser.uid;

    const result = await cardRef(uid, data.deckid, data.id).delete()
        .then(() => {
            return {
                message: "Flashcard Deleted Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })

    await decksRef(uid).doc(data.deckid).update({
        cardCount: decrement
    })

    return result
}
