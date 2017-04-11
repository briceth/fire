var setUp = {

   config: {
    apiKey: "AIzaSyDDN6a5aZivUXwK0hz0ot__0vuaEfSPzb8",
    authDomain: "chatfirst-fcac9.firebaseapp.com",
    databaseURL: "https://chatfirst-fcac9.firebaseio.com",
    storageBucket: "chatfirst-fcac9.appspot.com",
    messagingSenderId: "891940893513"
  };
  firebase.initializeApp(config);


    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
}

module.exports = setUp;
