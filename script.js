const API_KEY = "a1d17ccb";
const searchInput = document.getElementById('searchInput');
const movieGrid = document.getElementById('movieGrid');
const themeToggle = document.getElementById('themeToggle');
const spinner = document.getElementById('spinner');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length < 2) {
    movieGrid.innerHTML = `<p class="hint">🔍 Start typing to discover amazing movies...</p>`;
    return;
  }

  movieGrid.innerHTML = '';
  spinner.style.display = 'block';

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();

    spinner.style.display = 'none';

    if (data.Response === "True") {
      showMovies(data.Search);
    } else {
      movieGrid.innerHTML = `<p class="hint">❌ No results found.</p>`;
    }
  } catch (err) {
    spinner.style.display = 'none';
    movieGrid.innerHTML = `<p class="hint">⚠️ Network error. Please try again.</p>`;
  }
});

function showMovies(movies) {
  movieGrid.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450'}" alt="${movie.Title}" />
      <h3>${movie.Title} (${movie.Year})</h3>
    `;
    movieGrid.appendChild(card);
  });
}

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load preferred theme
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
});
