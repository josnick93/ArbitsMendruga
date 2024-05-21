import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAVJq1CATvVC-Y7MuRYdJwG6q2-zOpaR6A",
  authDomain: "artbits-final-projecc.firebaseapp.com",
  projectId: "artbits-final-projecc",
  storageBucket: "artbits-final-projecc.appspot.com",
  messagingSenderId: "1006799876952",
  appId: "1:1006799876952:web:d070bacbee647496216b2d",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const storage = getStorage(app);
const database = getFirestore(app);

export { auth, storage, database };
