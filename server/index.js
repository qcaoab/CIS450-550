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
app.get("/getAuthorInfo/:book_id", routes.getAuthorInfo);
app.get("/scrapeAuthorInfo/:author_id", routes.scrapeAuthorInfo);
app.get("/triviaQuery/:triviaQuery", routes.triviaQuery);
app.get("/getAuthorBooks/:author_id", routes.getAuthorBooks);
app.get("/getBookReviews/:book_id", routes.getBookReviews);
app.get("/searchForBooks/:query", routes.searchForBooks);
app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});
