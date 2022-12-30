import { doc, collection, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from 'firebase-config/firebase-config';

interface FirestoreHook {
  deleteDocument: (collectionName: string, id: string) => Promise<void>;
  addDocument: (
    collectionName: string,
    data: { expression: string; result: string; timestamp: object }
  ) => Promise<void>;
}

const useFirestore = (): FirestoreHook => {
  const deleteDocument = async (collectionName: string, id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const addDocument = async (
    collectionName: string,
    data: { expression: string; result: string; timestamp: object }
  ) => {
    await addDoc(collection(db, collectionName), data);
  };

  return {
    deleteDocument,
    addDocument,
  };
};

export default useFirestore;
