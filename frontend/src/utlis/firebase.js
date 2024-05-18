import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyAkYGfOXI7H22a_sX8kP5e1g-2OjnzAHuY",
    authDomain: "knowledgify-68e10.firebaseapp.com",
    projectId: "knowledgify-68e10",
    storageBucket: "knowledgify-68e10.appspot.com",
    messagingSenderId: "347302050873",
    appId: "1:347302050873:web:9534204aa5e87a706c61e8",
    measurementId: "G-HX9FH68E6V"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };