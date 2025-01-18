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
    apiKey: "",
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

const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const genres =
   [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
  const tags = document.getElementById('tags');
  getGenres();
  
  var selectedTags =[];

function getGenres() {
  tags.innerHTML="";
  genres.forEach(genre=>{
    const tag = document.createElement('div');
    tag.classList.add("tag")
    tag.id=genre.id;
    tag.innerText=genre.name;
    tag.addEventListener("click",()=>{
      if(selectedTags.length==0){selectedTags.push(genre.id)}
      else{
        if(selectedTags.includes(genre.id)){
          selectedTags.forEach((id,index)=>{
            if( id == genre.id){
              selectedTags.splice(index,1);
            }
          })

        }else{
          selectedTags.push(genre.id);
        }
      }
      console.log(selectedTags);
      getMovies(API_URL+"&with_genres="+selectedTags.join(','));
      highlight();
    

    })
    tags.append(tag);
    
  })

}


function highlight(){
  const reds = document.querySelectorAll(".tag");
  console.log(reds)
  reds.forEach(red=>{red.classList.remove("highlight")})
  clearBtn()

  if (selectedTags.length!=0){
    selectedTags.forEach(id=>{
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    })
  }
}

function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      clearBtn.classList.add('highlight')
  }else{
          
      let clear = document.createElement('div');
      clear.classList.add('tag','highlight');
      clear.id = 'clear';
      clear.innerText = 'Clear x';
      clear.addEventListener('click', () => {
          selectedGenre = [];
          getGenres();            
          getMovies(API_URL);
      })
      tags.append(clear);
  }
  
}


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
