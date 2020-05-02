const bodyParser = require("body-parser");
const express = require("express");
var routes = require("./routes.js");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get("/randomBooks/:num", routes.randomBooks);
app.get("/popularBooks", routes.popularBooks);
app.get("/bestReviews", routes.bestReviews);
app.get("/controBooks", routes.bestBooks);
app.get("/onehit", routes.onehit);
app.get("/prolificAuthors",routes.prolificAuthors);
app.get("/mostGenreAuthors", routes.mostGenreAuthors);
app.get("/multiGenreAuthor", routes.multiGenreAuthors);
app.get("/similarTitles/:str", routes.smimilarTitles)
app.get("/getAuthor/:author_id", routes.getAuthor);
app.get("/getReview/:book_id", routes.getReview);
app.get("/getBooksByAuthor/:author_id", routes.getBooksByAuthor);
app.get("/getGenresByAuthor/:author_id", routes.getGenresByAuthor);


app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});
