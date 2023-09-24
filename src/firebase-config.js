import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDMPZ001jvOiG492mQAjOdWHHeaONkW-H0",
    authDomain: "azotech-a09f1.firebaseapp.com",
    projectId: "azotech-a09f1",
    storageBucket: "azotech-a09f1.appspot.com",
    messagingSenderId: "976527481114",
    appId: "1:976527481114:web:bcc9eb52f6222a4b9834a3",
    measurementId: "G-FLRQ0Z9GPS"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
