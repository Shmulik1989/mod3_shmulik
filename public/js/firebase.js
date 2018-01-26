(function() {
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKlKwAPXzbz0TOCEYo9CSkkdOXhMHtBwg",
    authDomain: "nysl-shmulik.firebaseapp.com",
    databaseURL: "https://nysl-shmulik.firebaseio.com",
    projectId: "nysl-shmulik",
    storageBucket: "nysl-shmulik.appspot.com",
    messagingSenderId: "975538522083"

  };

  firebase.initializeApp(config);

  //Get elements from HTML

  const txtEmail = document.getElementById('email');
  const txtPassword = document.getElementById('userPassword');
  const btnLogIn = document.getElementById('login');
  const btnLogOut = document.getElementById('logout');
  const btnSignUp = document.getElementById('signup');
  const btnLoginPage = document.getElementById('loginPage')

  //Add login click event
  btnLogIn.addEventListener('click', e => {
    //get valua from password and email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,pass,);
    promise.catch( e => console.log(e.messege));

  });
  
  btnSignUp.addEventListener('click', function(){
    console.log('hello');
    var valid = document.querySelector('#loginForm').reportValidity();

    if(!valid){
        return false;
    }

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch( e => console.log(e.message));

  });

  $(btnLogOut).on('click', function(){
    firebase.auth().signOut();
    $('#lowerNav, #upperNav').hide();

  });

  $('#loginPage').on('click', function() {
    $('#lowerNav, #upperNav').hide();
  });

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

    } else {

        console.log("not logged in");
        btnLogOut.classList.add('hide');
        btnLogIn.classList.remove('hide');
        $('#logout').hide();
        $('#loginPage').show();
    }

  });

}());


