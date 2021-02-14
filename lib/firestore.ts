import firebase from "firebase/app";
import "firebase/firestore";
import { Word } from "../interfaces/index";

// Firebase initializeを一度だけ実行
if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
}

export const db = firebase.firestore();

/**
 * Firestoreのコンバート関係
 * firebase.firestore.FirestoreDataConverter<T>
 */
export const wordConverter = {
  toFirestore(word: Word): firebase.firestore.DocumentData {
    return {
      alphabet: word.alphabet,
      category: word.category,
      description: word.description,
      fullword: word.fullword,
      investment_round: word.investment_round,
      syllabary: word.syllabary,
      word: word.word,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Word {
    const data = snapshot.data(options)!;
    return {
      alphabet: data.alphabet,
      category: data.category,
      description: data.description,
      fullword: data.fullword,
      investment_round: data.investment_round,
      syllabary: data.syllabary,
      word: data.word,
    };
  },
};
