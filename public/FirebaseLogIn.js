var txtEmail = require('./firebaseSetUp.js');
var txtPassword = require('./firebaseSetUp.js');
var btnLogin = require('./firebaseSetUp.js');
var txtEmail = require('./firebaseSetUp.js');
var btnSignUp = require('./firebaseSetUp.js');
var btnLogout = require('./firebaseSetUp.js');
var firebase = require('./firebaseSetUp.js');




    //LOGIN EVENT LISTENER
    btnLogin.addEventListener('click', event => {
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.then(() => console.log('log in'))
            promise.catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
              });
           });

    //SIGN UP EVENT LISTENER
     btnSignUp.addEventListener('click', event => {
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.createUserWithEmailAndPassword(email, pass);

            promise.catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
              });
           });

      //LOG OUT EVENT LISTENER
      btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
      });

     //ADD A REALTIME addEventListener
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
          btnLogout.classList.remove('hide');
        } else {
          btnLogout.classList.add('hide');
          console.log('not logged in')
        }
     });

