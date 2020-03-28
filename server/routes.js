var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
	SELECT DISTINCT genre
	FROM Genres;
	`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  //console.log(req);
  var query = `
  SELECT title, rating, vote_count
  FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
  WHERE genre='${req.params.genre}'
  ORDER BY rating DESC, vote_count DESC
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var title = req.params.title;
  var query = `
	WITH TargetGenres(genre) AS
		(SELECT genre
		 FROM Movies
		 JOIN Genres ON Movies.id = Genres.movie_id
		 WHERE title = '${title}')
	SELECT title,
		   id,
		   rating,
		   vote_count
	FROM Movies
	JOIN Genres ON Movies.id = Genres.movie_id
	WHERE genre IN
			(SELECT *
			 FROM TargetGenres)
		AND title <> '${title}'
	GROUP BY id
	HAVING COUNT(id) =
		(SELECT COUNT(*)
		 FROM TargetGenres)
	ORDER BY rating DESC,
			 vote_count DESC
	LIMIT 5;
	`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
  var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var decade = req.params.decade;
  var query = `
  WITH GenreWithMovie(genre,avg_rating) AS
    (SELECT genre,
            AVG(rating) AS avg_rating
     FROM Movies
     JOIN Genres ON Movies.id = Genres.movie_id
     WHERE release_year >=${decade}
         AND release_year <${decade}+10
     GROUP BY genre),
     GenreNoMovie(genre,avg_rating) AS
    (SELECT DISTINCT genre,
                     0 AS avg_rating
     FROM Genres
     WHERE genre NOT IN
             (SELECT genre
              FROM GenreWithMovie) )
SELECT genre,
       avg_rating
FROM GenreWithMovie
UNION
SELECT genre,
       avg_rating
FROM GenreNoMovie
ORDER BY avg_rating DESC,
         genre ASC;
	`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getRandomMovies(req, res) {
  var query = `
	SELECT imdb_id
	FROM Movies 
	ORDER BY RAND()
	LIMIT 12;
	`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllGenres: getAllGenres,
  getTopInGenre: getTopInGenre,
  getRecs: getRecs,
  getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  getRandomMovies: getRandomMovies
};

