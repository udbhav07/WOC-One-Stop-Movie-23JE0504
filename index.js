var firebaseConfig = {
  apiKey: "AIzaSyBb_uaUf7h9fehBrb2zMzHA2iKqjE_iSCQ",
  authDomain: "testing-project-51fc0.firebaseapp.com",
  databaseURL: "https://testing-project-51fc0-default-rtdb.firebaseio.com",
  projectId: "testing-project-51fc0",
  storageBucket: "testing-project-51fc0.appspot.com",
  messagingSenderId: "573655899440",
  appId: "1:573655899440:web:99060c52929031ee317cf5"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).set(user_data)
    alert('User Created!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}
function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
      }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser
    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!');
    window.location.href = "homepage.html"     
        


  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}



// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
