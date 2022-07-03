import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNurN94pwv0_-8ssoevgujLtG77tRbGv4",
  authDomain: "bookstore-804bd.firebaseapp.com",
  projectId: "bookstore-804bd",
  storageBucket: "bookstore-804bd.appspot.com",
  messagingSenderId: "374849261068",
  appId: "1:374849261068:web:50bc38ddad2501854de829"
};


const app = initializeApp(firebaseConfig);
export default getFirestore()
