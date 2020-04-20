async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(`http://localhost:8081/randomMovies`, {
    method: "GET",
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export { postData };

fetch(`http://localhost:8081/randomMovies`, {
  method: "GET",
})
  .then(
    (res) => {
      return res.json();
    },
    (err) => {
      console.log(err);
    }
  )
  .then((movieList) => {
    if (!movieList) return;
    let movieDivs = movieList.map((movieObj, i) => {
      fetch(`http://www.omdbapi.com/?i=${movieObj.imdb_id}&apikey=e18f3f1b`, {
        method: "GET",
      })
        .then(
          (res) => {
            return res.json();
          },
          (err) => {
            console.log(err);
          }
        )
        .then((movieJson) => {
          console.log(movieJson);
          return this.setState({
            movieData: this.state.movieData.concat(
              <PosterEntry {...movieJson} />
            ),
          });
        });
    });
  });
