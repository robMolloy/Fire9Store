import { initializeApp } from 'firebase/app';
// initializeApp(firebaseCredentials);

import { getFirestore, writeBatch, doc, collection, query, where, onSnapshot, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { creater, reader, updater, deleter, listener } from '../components';

const helpers = { writeBatch, doc, collection, query, where, onSnapshot };
const crudHelpers = { getDoc, getDocs, setDoc, updateDoc, deleteDoc };

export class Fire9Store {
  constructor(config) {
    // Initialize Firebase
    initializeApp(config);
    this.db = getFirestore();

    Object.assign(this, helpers, crudHelpers, { uuid });
    Object.assign(this, creater, reader, updater, deleter, listener);
  }

  isManyDocs(data) {
    return Array.isArray(data);
  }

  parseDoc(doc1) {
    return { ...doc1.data(), id: doc1.id };
  }

  parseDocs(docs) {
    const rtn = [];
    docs.forEach((doc1) => rtn.push(this.parseDoc(doc1)));
    return rtn;
  }

  getRef({ collectionName, data, id }) {
    const refId = id || data.id;
    return this.doc(this.db, collectionName, refId);
  }

  getCollection({ collectionName }) {
    return this.collection(this.db, collectionName);
  }

  getBatch() {
    // return this.db.batch();
    return this.writeBatch(this.db);
  }

}
