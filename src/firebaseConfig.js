// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyDcvrKduuIXQJMmHRfWED9RxG6popYJtrE",
    authDomain: "db-ecommerce-34f42.firebaseapp.com",
    databaseURL: "https://db-ecommerce-34f42-default-rtdb.firebaseio.com",
    projectId: "db-ecommerce-34f42",
    storageBucket: "db-ecommerce-34f42.appspot.com",
    messagingSenderId: "46517141957",
    appId: "1:46517141957:web:5b061dc350a6e3be0ecbac",
    measurementId: "G-Q6R3W57DS1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

