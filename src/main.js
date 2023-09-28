import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkYQvEXXNWw6WSudXOybc3YNZ11ONTb9g",
  authDomain: "vue-firebase-auth-bafc4.firebaseapp.com",
  projectId: "vuejstest-942bd",
  storageBucket: "vue-firebase-auth-bafc4.appspot.com",
  messagingSenderId: "728860345284",
  appId: "1:728860345284:web:b163b8b54d1f40a5c15a91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
