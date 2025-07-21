// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiV6Wg5ae4iqDprgh2MzQl2Gz1424Z_Vg",
  authDomain: "institution-management-d3f1b.firebaseapp.com",
  projectId: "institution-management-d3f1b",
  storageBucket: "institution-management-d3f1b.firebasestorage.app",
  messagingSenderId: "925807668461",
  appId: "1:925807668461:web:f0590ae853d144822bf0e4",
  measurementId: "G-MFYXKZF4BL"
};

const app = initializeApp(firebaseConfig);

// Export Firebase features you’ll use
export const auth = getAuth(app);
export const db = getFirestore(app);
