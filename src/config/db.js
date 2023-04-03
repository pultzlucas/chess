import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

export default (() => {
    const firebaseConfig = {
        apiKey: "AIzaSyA1Xo5laer8aT2yKQDGYynrIF1A7O7l9Xk",
        authDomain: "chess-df361.firebaseapp.com",
        projectId: "chess-df361",
        storageBucket: "chess-df361.appspot.com",
        messagingSenderId: "1096976589768",
        appId: "1:1096976589768:web:e4c9cb31faf3885d6756fd",
        measurementId: "G-VGYPP36Q7S"
    };
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)
    return { db, set, ref }
})