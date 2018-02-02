(function() {
     // Initialize Firebase.
  var config = {
    apiKey: "AIzaSyBKlKwAPXzbz0TOCEYo9CSkkdOXhMHtBwg",
    authDomain: "nysl-shmulik.firebaseapp.com",
    databaseURL: "https://nysl-shmulik.firebaseio.com",
    projectId: "nysl-shmulik",
    storageBucket: "nysl-shmulik.appspot.com",
    messagingSenderId: "975538522083"

  };

  firebase.initializeApp(config);

  //Get elements from HTML (auth).

  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('userPassword');
  const btnLogIn = document.getElementById('login');
  const btnLogOut = document.getElementById('logout');
  const btnSignUp = document.getElementById('signup');
  const btnLoginPage = document.getElementById('loginPage')

 //Get elements from HTML (chat).

  var usernameInput = document.querySelector('#chatUsername');
  var textInput = document.querySelector('#chatText');
  var postButton = document.querySelector('#post');
  var db = firebase.database();

  //Add login button click event (auth).
  btnLogIn.addEventListener('click', e => {
    //Get valua from password and email (auth).
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,pass,);
    promise.catch( e => console.log(e.messege));

  });

  //Logout button function + removal of lower and upper navbar in login page when logging out.

    $(btnLogOut).on('click', function(){
      firebase.auth().signOut();
      $('#lowerNav, #upperNav').hide();
    
  });

  //Check that a proper email and long enough password was inserted(auth).
  
  btnSignUp.addEventListener('click', function(){
    var valid = document.querySelector('#loginForm').reportValidity();

    if(!valid){
        return false;
    }

//Create a user using email and password (auth).

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch( e => console.log(e.message));

  });
    
  //App appereance when user is logged in/out.

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){

        console.log("logged in");
        btnLogOut.classList.remove('hide');
        btnLogIn.classList.add('hide');
        $("section").hide( "blind", {direction: "horizontal"}, 700 );
        $("#homepage").show( "fold", {horizFirst: true}, 700 );
        $('#lowerNav, #upperNav').fadeIn(1000);
        $('.active').removeClass('active');
        $('[data-name="homepage"]').addClass('active');
        $('#logout').show();
        $('#loginPage').hide();
        alert('You have succesfully Logged in,Welcome to NYSL!');

    } else {

        console.log("not logged in");
        btnLogOut.classList.add('hide');
        btnLogIn.classList.remove('hide');
        $('#logout').hide();
        $('#loginPage').show();
    }

  });

  //Create an event listener for the post button(chat). 

  postButton.addEventListener("click", function() {
    var chatUser = usernameInput.value;
    var chatText = textInput.value;
    var db = firebase.database();
    db.ref('post').push({username:chatUser, text:chatText});
    textInput.value = "";

  });

    /** Function to add a data listener to chat **/
    var startListening = function() {
  
      db.ref('post').on('child_added', function(snapshot) {
        var msg = snapshot.val();
      
        var msgUsernameElement = document.createElement("b");
        msgUsernameElement.textContent = msg.username;
        
        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;
  
        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);
        msgElement.className = "msg";
        document.getElementById("results").appendChild(msgElement);
      });
    }

    // Begin listening to data from firebase chat.
    startListening();

}());