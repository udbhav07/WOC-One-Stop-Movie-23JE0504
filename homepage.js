const accountdetails = document.querySelector('.account-details'); 

const setupUI = (user)=>{
    if(user){
        //account info
        const html = `
        <div> Logged in as ${user.email}</div>
        `;
        accountdetails.innerHTML = html;
    }
}



var firebaseConfig = {
    apiKey: "AIzaSyBb_uaUf7h9fehBrb2zMzHA2iKqjE_iSCQ",
    authDomain: "testing-project-51fc0.firebaseapp.com",
    projectId: "testing-project-51fc0",
    storageBucket: "testing-project-51fc0.appspot.com",
    messagingSenderId: "573655899440",
    appId: "1:573655899440:web:99060c52929031ee317cf5"
  };
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // Initialize variables
  // const auth = firebase.auth()
  // const database = firebase.database()
// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
       alert('user signed out');
       window.location.href = "loginoutpage.html"
    });
});

const API_KEY = 'api_key=3de6940859a5e0754319697fda7aa5a6';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;


const main = document.getElementById("main")
const search = document.getElementById("search")
const searchForm = document.getElementById("search_form")
getMovies(API_URL);
function getMovies(url){
  fetch(url).then(res=>res.json()).then(data=>{
    showMovies(data.results);}
    )}


function showMovies(data){
  main.innerHTML = ``
  data.forEach(movie => {
    const {title,poster_path , vote_average , overview} = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add('movie');
    movieE1.innerHTML= `
    <img src="${IMG_URL+poster_path}" alt="${title}">
    <div class="movie-info">
      <h3>
       ${title}
      </h3>
      <span class="${getColor(vote_average)}">
        ${vote_average}
      </span>
    </div>
      <div class="overview">
       <h3> Overview </h3>
       ${overview}
      </div>
    
    `;
    main.appendChild(movieE1)
  }
  )
}


function getColor(vote){
  if(vote>=8){
    return "green"
  }
  else if(vote>=5){
    return "orange"
  }
  else{return "red"}
}

searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm){
    getMovies(searchURL+'&query='+ searchTerm)
  }
  else{getMovies(API_URL)}
})