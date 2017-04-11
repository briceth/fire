(function() {
  // Initialize Firebase
   var config = {
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


    //read messages from firebase
    const dbRef = firebase.database().ref('messages');

          dbRef.on('child_added', data => {
            var messages = [];

            for (var key in data) {
                messages.push(data)
            };

          const newContent = document.createElement("li");
          const newContentUser = document.createElement("li");

            messages.forEach((message) => {
              newContent.innerText = message.val().content;
              //newContentUser.innerText = message.val().name;
            });

            chatList = document.getElementById("chatList");
            chatList.appendChild(newContent);
            //chatList.appendChild(newContentUser);
          });


    //push messages to firebase
    const content = document.getElementById("textarea1");
    const pushMessage = document.getElementById("pushMessage");

      pushMessage.addEventListener('click', e => {
        const user = firebase.auth().currentUser;
        const submitContent = content.value;
        const userName = 'brice';

          if (user) {
            console.log('you are sign in so you can push a message');
            firebase.database().ref('messages').push({
              name: userName,
              content: submitContent
            });
          } else {
            console.log("you need to sign in");
          };
          document.getElementById('textarea1').value = "";
      });


      //upload files

      const uploader = document.getElementById('uploader');
      const fileButton = document.getElementById('fileButton');

      //Listen for file selection
      fileButton.addEventListener('change', e => {
          //get a files
          const file = e.target.files[0];

          //Get a reference to the storage service + create a storage ref
          //Folder / files
          const user = firebase.auth().currentUser;
          console.log(user.uid);
          const filePath = user.uid + '/' + 'photos/' + file.name;
          const storageRef = firebase.storage().ref(filePath);

          //Upload file
          const task = storageRef.put(file);
                task.then((snapshot) => {
                  const imageUrl = snapshot.metadata.fullPath;
                  const storage = firebase.storage().ref(filePath);

                  storage.getDownloadURL().then(function(url) {

                    const img = document.querySelector('myImg');
                          img.src = url;

                  });
                });


          //Update progress bar
          task.on('state_changed',

            function progress(snapshot) {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploader.value = progress;
              console.log('Upload is ' + progress + '% done');
            },
            function error(err) {
              window.alert('There is an issue while uploading tot the firebase cloud storage', err);
            },
            function complete() {

            }

          );
      });

}());

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
