// src/database/firebaseconfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

// Extrae variables del manifest o expoConfig
const { extra } = Constants.manifest || Constants.expoConfig || {};

if (!extra || !extra.FIREBASE_API_KEY) {
  console.error(
    "Error: Las variables de entorno de Firebase no están definidas."
  );
}

// Configuración Firebase
const firebaseConfig = {
  apiKey: extra.FIREBASE_API_KEY,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  projectId: extra.FIREBASE_PROJECT_ID,
  storageBucket: extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: extra.FIREBASE_APP_ID,
};

// Inicializa Firebase solo una vez
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa Auth solo una vez
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Firestore
const db = getFirestore(app);

export { app, auth, db };
