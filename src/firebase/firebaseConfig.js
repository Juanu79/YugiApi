// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⭐ Tus datos reales de Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyDGHLe6A9dFA232ZIfA8Qobwu2SRCIemww",
  authDomain: "yugiapi-d4d98.firebaseapp.com",
  projectId: "yugiapi-d4d98",
  storageBucket: "yugiapi-d4d98.firebasestorage.app",
  messagingSenderId: "133249695836",
  appId: "1:133249695836:web:337e1b62155c3d4a0e6699"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar para usar en toda la app
export { auth, db };
