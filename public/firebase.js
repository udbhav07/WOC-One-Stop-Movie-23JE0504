import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"; 

const firebaseConfig = {
  apiKey: "",
  authDomain: "testing-project-51fc0.firebaseapp.com",
  databaseURL: "https://testing-project-51fc0-default-rtdb.firebaseio.com",
  projectId: "testing-project-51fc0",
  storageBucket: "testing-project-51fc0.appspot.com",
  messagingSenderId: "573655899440",
  appId: "1:573655899440:web:99060c52929031ee317cf5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

export { auth, database }; 
