const firebaseConfig = {
    apiKey: "AIzaSyAZk2Ps_EUapXOiXrddPghs8NtMBEva99M",
    authDomain: "crm-mobile-shop.firebaseapp.com",
    databaseURL: "https://crm-mobile-shop-default-rtdb.firebaseio.com",
    projectId: "crm-mobile-shop",
    storageBucket: "crm-mobile-shop.appspot.com",
    messagingSenderId: "298043435043",
    appId: "1:298043435043:web:e2f97ddc70fcdf0805a996"
  };
  // Get references to the email and password inputs, and the sign in and sign up buttons
var email = document.getElementById("email");
var password = document.getElementById("password");
var signInButton = document.getElementById("signInButton");


// Add event listeners to the sign in and sign up buttons
signInButton.addEventListener("click", function() {
    console.log("ayan")
  // Sign in the user using Firebase's signInWithEmailAndPassword method
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function() {
      // Redirect the user to the protected resources page
      window.location.href = "/index.html";
    })
    .catch(function(error) {
      // Show an error message
      alert(error.message);
    });
});

