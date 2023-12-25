const searchBox = document.getElementById("search-box");
const resultsContainer = document.getElementById("results");
const movieDetailsContainer = document.getElementById('movie-details');

let debounceTimer = null;
let isLoading=false;
function debounce(func, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await func();
  }, delay);
}
const displayResults = (movies) => {
  resultsContainer.innerHTML = "";
  movieDetailsContainer.innerHTML="";
 if(movies.length==0){
    resultsContainer.innerHTML = "No data found";
  }else{
      movies.forEach((movieDetails) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/868e2d38155793.57575971b116a.jpg" alt="${movieDetails.title}">
          <p>${movieDetails.title} (${movieDetails.release_date})</p>
        `;
        movieCard.addEventListener("click", () => {showMovieDetails(movieDetails)});
        resultsContainer.appendChild(movieCard);
      });
  }
};



async function fetchData(movie){
try{
  let api=`https://api.themoviedb.org/3/search/movie?api_key=e49cc387ab3580c42606114c5ec9fadd&query=${movie}`;
  console.log(api)
  const response = await fetch(api);
  let data=await response.json();
  console.log(JSON.stringify(data.results[0],null,2))

  return data.results
}catch(err){
  alert("Something went wrong")
}
}
searchBox.addEventListener("input", (e) => {
  const query = searchBox.value.trim();
    debounce(async () => {
      let data=await fetchData(query);
      displayResults(data);
    }, 0);
 
}); 
const showMovieDetails = async (movieDetails) => {
  resultsContainer.innerHTML=""
  movieDetailsContainer.innerHTML = `
    <h2>${movieDetails.Title} (${movieDetails.release_date})</h2>
    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/868e2d38155793.57575971b116a.jpg" alt="${movieDetails.Title} Poster">
    <p>IMDb Rating: ${movieDetails.popularity}</p>
  `;
  movieDetailsContainer.style.display = 'block';
};