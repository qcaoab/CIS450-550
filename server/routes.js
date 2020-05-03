var config = require("./db-config.js");
const oracledb = require("oracledb");
const axios = require("axios");
const cheerio = require("cheerio");
const TriviaQueryString = require("./triviaQueries.js");

async function scrapeAuthor(author_id) {
  const html = await axios.get(
    `https://www.goodreads.com/author/show/${author_id}`
  );
  const $ = await cheerio.load(html.data);
  let data = {};

  data["IMAGE_URL"] =
    $("div.authorLeftContainer>a>img").attr("src") ||
    $("div.authorLeftContainer>img").attr("src");

  // $(`#freeTextauthor${author_id}`).$('.cc-newsbody').find('br').replaceWith('\n')
  data["AUTHOR_DESC"] =
    $(`#freeTextauthor${author_id}`).text() ||
    $(`#freeTextContainerauthor${author_id}`).text();
  data["INFO"] = { DATA_TITLE: [], DATA_ITEM: [] };

  $("div.dataTitle").each((item, element) => {
    let str = $(element).text();
    if (str != "Born") {
      data["INFO"]["DATA_TITLE"].push($(element).text());
    }
  });
  $("div.dataItem").each((item, element) => {
    data["INFO"]["DATA_ITEM"].push(
      $(element)
        .text()
        .replace(/(\n|\t)/, "")
        .trim()
    );
    // data["INFO"]["DATA_ITEM"].push($(element).text());
  });
  console.log(data);
  return data;
}

async function init() {
  await oracledb.createPool(config);
  console.log("Connection pool started");
}
init();

function randomBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  console.log(req.params.num, typeof req.params.num);
  let numOfBooks = req.params.num ? req.params.num : 10;
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT *
        FROM BOOK2
        SAMPLE(${req.params.num})`,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: parseInt(req.params.num)
        }
      );
    })
    .then(
      function (result) {
        console.log("Query executed");
        res.json(result.rows);
        // resolve(result.rows[0]);
      },
      function (err) {
        console.log("Error occurred", err);
      }
    )
    .then(function () {
      if (conn) {
        // If conn assignment worked, need to close.
        return conn.close();
      }
    })
    .then(function () {
      console.log("Connection closed");
    })
    .catch(function (err) {
      // If error during close, just log.
      console.log("Error closing connection", err);
    });
}

function getAuthorInfo(req, res) {
  let conn; // Declared here for scoping purposes.
  console.log(req.params.book_id, typeof req.params.book_id);
  let book_id = req.params.book_id;
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `
        SELECT *
        FROM AUTHOR
        WHERE AUTHOR_ID IN 
        (SELECT AUTHOR_ID FROM AUTHOROF WHERE BOOK_ID = ${book_id})
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 1
        }
      );
    })
    .then(
      function (result) {
        console.log("Query executed");
        if (result.rows[0]) {
          let author_id = result.rows[0].AUTHOR_ID;
          console.log(author_id);
          scrapeAuthor(author_id).then((x) =>
            res.json({ ...result.rows[0], ...x })
          );
        } else {
          res.json({
            AUTHOR_ID: 0,
            NAME: "Anonymous"
          });
        }

        // resolve(result.rows[0]);
      },
      function (err) {
        console.log("Error occurred", err);
      }
    )
    .then(function () {
      if (conn) {
        // If conn assignment worked, need to close.
        return conn.close();
      }
    })
    .then(function () {
      console.log("Connection closed");
    })
    .catch(function (err) {
      // If error during close, just log.
      console.log("Error closing connection", err);
    });
}
//----------------------------------------------------------------

function scrapeAuthorInfo(req, res) {
  let conn; // Declared here for scoping purposes.
  console.log(req.params.author_id, typeof req.params.author_id);
  let author_id = req.params.author_id;
  scrapeAuthor(author_id).then((x) => res.json(x));
}

function triviaQuery(req, res) {
  let conn; // Declared here for scoping purposes.
  console.log(req.params.triviaQuery, typeof req.params.triviaQuery);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        TriviaQueryString[req.params.triviaQuery],
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 20
        }
      );
    })
    .then(
      function (result) {
        console.log("Query executed");
        res.json(result.rows);
      },
      function (err) {
        console.log("Error occurred", err);
      }
    )
    .then(function () {
      if (conn) {
        return conn.close();
      }
    })
    .then(function () {
      console.log("Connection closed");
    })
    .catch(function (err) {
      console.log("Error closing connection", err);
    });
}

function getAuthorBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  console.log(req.params.author_id, typeof req.params.author_id);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `WITH BOOK_LIST AS (
          SELECT BOOK_ID FROM AUTHOROF WHERE AUTHOR_ID = ${req.params.author_id}
          )
        SELECT * FROM BOOK2 NATURAL JOIN BOOK_LIST`,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 20
        }
      );
    })
    .then(
      function (result) {
        console.log("Query executed");
        res.json(result.rows);
      },
      function (err) {
        console.log("Error occurred", err);
      }
    )
    .then(function () {
      if (conn) {
        return conn.close();
      }
    })
    .then(function () {
      console.log("Connection closed");
    })
    .catch(function (err) {
      console.log("Error closing connection", err);
    });
}

function getBookReviews(req, res) {
  let conn; // Declared here for scoping purposes.
  console.log(req.params.book_id, typeof req.params.book_id);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT * FROM REVIEW WHERE BOOK_ID = '${req.params.book_id}'`,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 3
        }
      );
    })
    .then(
      function (result) {
        console.log("Query executed");
        res.json(result.rows);
      },
      function (err) {
        console.log("Error occurred", err);
      }
    )
    .then(function () {
      if (conn) {
        return conn.close();
      }
    })
    .then(function () {
      console.log("Connection closed");
    })
    .catch(function (err) {
      console.log("Error closing connection", err);
    });
}

function searchForBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  console.log(req.params.query, typeof req.params.query);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT * FROM BOOK2 WHERE TITLE LIKE '%${req.params.query}%'`,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 20
        }
      );
    })
    .then(
      function (result) {
        console.log("Query executed");
        res.json(result.rows);
      },
      function (err) {
        console.log("Error occurred", err);
      }
    )
    .then(function () {
      if (conn) {
        return conn.close();
      }
    })
    .then(function () {
      console.log("Connection closed");
    })
    .catch(function (err) {
      console.log("Error closing connection", err);
    });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  randomBooks,
  getAuthorInfo,
  scrapeAuthorInfo,
  triviaQuery,
  getAuthorBooks,
  getBookReviews,
  searchForBooks
};
