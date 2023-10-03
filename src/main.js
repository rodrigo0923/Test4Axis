import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getFirestore } from "firebase/firestore";

createApp(App).use(router).mount("#app");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkYQvEXXNWw6WSudXOybc3YNZ11ONTb9g",
  authDomain: "vuejstest-942bd.firebaseapp.com",
  databaseURL: "https://vuejstest-942bd-default-rtdb.firebaseio.com",
  projectId: "vuejstest-942bd",
  storageBucket: "vuejstest-942bd.appspot.com",
  messagingSenderId: "758017724877",
  appId: "1:758017724877:web:f9763fd719bc3ea29b7484",
  measurementId: "G-B8HXGSFBYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//Initialize Firestore database real

export { app, db };
