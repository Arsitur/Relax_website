const firebaseConfig = {
    apiKey: "AIzaSyAIit1b_9_JxLmLTJvehaj0_X6Zf1A3RYI",
    authDomain: "relax-92c1e.firebaseapp.com",
    projectId: "relax-92c1e",
    storageBucket: "relax-92c1e.appspot.com",
    messagingSenderId: "486583906577",
    appId: "1:486583906577:web:993f9712bc823a70199cb0",
    measurementId: "G-XY6LKLXYRY"
};

// Initialize Firebase
const APP = firebase.initializeApp(firebaseConfig);

// Google Provider
let GoogleProvider = new firebase.auth.GoogleAuthProvider();

// Twitter Provider
let TwitterProvider = new firebase.auth.TwitterAuthProvider();;

// User Collection
const usersDB = firebase.firestore().collection("users");

//Product Collection
const productsDB = firebase.firestore().collection("products");

// Carts Collection
const cartsDB = firebase.firestore().collection("carts")

// Articles Collection
const articlesDB = firebase.firestore().collection("articles");

// Comments Collection
const commentsDB = firebase.firestore().collection("comments");


function formatDate(stamp)
{
    let date = new Date(stamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let result = day + "." + month + "." + year;
    return result;
}

let userInitialName = "user12747538";
let startImage = "https://firebasestorage.googleapis.com/v0/b/relax-92c1e.appspot.com/o/36caa0817d2c07fd46cf610c3aa4b1646254a1d4.png?alt=media&token=37e9da13-febb-4f75-b959-7109067af6cc";

function compar(a, b)
{
    return b.data().datePosted - a.data().datePosted;
}




// "https://firebasestorage.googleapis.com/v0/b/relax-92c1e.appspot.com/o/36caa0817d2c07fd46cf610c3aa4b1646254a1d4.png?alt=media&token=37e9da13-febb-4f75-b959-7109067af6cc"