// homepage.js
import { auth } from './firebase.js'; // 

const accountdetails = document.querySelector('.account-details');

// Display user info in modal
const setupUI = (user) => {
  if (user) {
    const html = `
      <div><strong>Logged in as:</strong> ${user.email}</div>
    `;
    accountdetails.innerHTML = html;
  }
};




// Logout functionality
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    alert('User signed out');
    window.location.href = "index.html";
  });
});

// TMDB API config
const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

// Genre filter
const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const tags = document.getElementById('tags');
let selectedTags = [];

function getGenres() {
  tags.innerHTML = "";
  genres.forEach(genre => {
    const tag = document.createElement('div');
    tag.classList.add("tag");
    tag.id = genre.id;
    tag.innerText = genre.name;

    tag.addEventListener("click", () => {
      if (selectedTags.includes(genre.id)) {
        selectedTags = selectedTags.filter(id => id !== genre.id);
      } else {
        selectedTags.push(genre.id);
      }

      getMovies(API_URL + "&with_genres=" + selectedTags.join(','));
      highlightTags();
    });

    tags.append(tag);
  });
}

function highlightTags() {
  const allTags = document.querySelectorAll(".tag");
  allTags.forEach(tag => tag.classList.remove("highlight"));

  if (selectedTags.length !== 0) {
    selectedTags.forEach(id => {
      const highlightedTag = document.getElementById(id);
      if (highlightedTag) highlightedTag.classList.add("highlight");
    });
    showClearButton();
  } else {
    removeClearButton();
  }
}

function showClearButton() {
  if (!document.getElementById('clear')) {
    const clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';

    clear.addEventListener('click', () => {
      selectedTags = [];
      getGenres();
      getMovies(API_URL);
    });

    tags.append(clear);
  }
}

function removeClearButton() {
  const clearBtn = document.getElementById('clear');
  if (clearBtn) clearBtn.remove();
}

// Movie display
const main = document.getElementById("main");
const search = document.getElementById("search");
const searchForm = document.getElementById("search_form");

getGenres();
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  if (!data || data.length === 0) {
    main.innerHTML = "<h2>No results found.</h2>";
    return;
  }

  main.innerHTML = "";
  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${title}">

      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;

    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) return "green";
  else if (vote >= 5) return "orange";
  else return "red";
}

// Search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

// Auth state check
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  } else {
    window.location.href = "index.html";
  }
});
