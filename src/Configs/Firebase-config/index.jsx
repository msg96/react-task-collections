import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: import.meta.env.NF_FB_API_KEY,
  authDomain: import.meta.env.NF_FB_AUTH_DOMAIN,
  databaseURL: import.meta.env.NF_FB_DATABASE_URL,
  projectId: import.meta.env.NF_FB_PROJECT_ID,
  storageBucket: import.meta.env.NF_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.NF_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.NF_FB_APP_ID,
  measurementId: import.meta.env.NF_FB_MEASUREMENT_ID,
});

export default app;

export const Auth = getAuth(app);
export const DataBase = getFirestore(app);

export const TableNames = {
  categories: import.meta.env.NF_CATEGORIES,
  tasks: import.meta.env.NF_TASKS,
};
