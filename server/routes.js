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

oracledb.createPool(config);

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
function bestReviews(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT * FROM(
          SELECT review_text
          FROM Review
          ORDER BY n_votes DESC
          )
          WHERE ROWNUM<10;          
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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

function bestAuthors(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT name
        FROM Author
        WHERE average_rating =5 and rating_count>50
        ORDER BY average_rating DESC;                
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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


function bestBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
      `WITH Book_Rating(book_id, title, avg_rating) AS
        (SELECT Book.book_id, Book.title, AVG(Review.rating)
         FROM Book 
          JOIN Review ON Book.book_id = Review.book_id
         GROUP BY Book.book_id, Book.title)
        SELECT FLOOR(Book.publication_year/10)*10 AS decade, Genre.genre_name, Book_Rating.title
         FROM Book, Book_Rating
          JOIN Genre ON Book_Rating.book_id = Genre.book_id
          WHERE avg_rating >= ALL
            (SELECT avg_rating
             FROM Book_Rating)
             and Book.book_id=Book_Rating.book_id
       GROUP BY FLOOR(Book.publication_year/10), Genre.genre_name, Book_Rating.title;               
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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

function controBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
      `SELECT title, STDDEV(rating) AS stdev
      FROM Book JOIN Review ON Book.book_id = Review.book_id 
      GROUP BY Book.book_id, title
      ORDER BY STDDEV(rating) DESC
      ;               
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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

function onehit(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
      `SELECT name, title
      FROM Book JOIN AuthorOf ON Book.book_id = AuthorOf.book_id
      JOIN Author ON AuthorOf.author_id = Author.author_id
      WHERE Book.average_rating > Author.average_rating
      GROUP BY Author.author_id, name, title
      HAVING COUNT(*) >= 1    
      ;               
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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

function prolificAuthors(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
      `WITH Author_Genre(name, genre_name, num) AS
        (SELECT name, genre_name, COUNT(*)
        FROM Author
        JOIN AuthorOf ON Author.author_id = AuthorOf.author_id
        JOIN Genre ON AuthorOf.book_id = Genre.book_id
        GROUP BY Author.author_id, genre_name, name )
      SELECT name, genre_name
      FROM Author_Genre G1
      WHERE num >= ALL
          (SELECT num
           FROM Author_Genre G2
           WHERE G1.genre_name = G2.genre_name)
      ;               
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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

function mostGenreAuthors(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
      `WITH Author_Genre(author_id, genre_name,name) AS
        (SELECT Author.author_id, Genre.genre_name, Author.name
        FROM Author
        JOIN AuthorOf ON Author.author_id = AuthorOf.author_id
        JOIN Genre ON AuthorOf.book_id = Genre.book_id
        GROUP BY Author.author_id, Genre.genre_name,Author.name)
      SELECT author_id,Author_Genre.name,count(*)
      FROM Author_Genre 
      GROUP BY Author_Genre.name, Author_Genre.author_id
      HAVING COUNT(*) >= ALL
              (SELECT COUNT(*)
              FROM Author_Genre
              GROUP BY author_id)
      ;               
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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


function multiGenreAuthors(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  //console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
      `WITH Highly_Rated_Books(book_id) AS
        (SELECT book.book_id
        FROM Book  
        WHERE average_rating>4)
      SELECT author_id 
      FROM Highly_Rated_Books JOIN AuthorOf ON Highly_Rated_Books.book_id = AuthorOf.book_id
      JOIN Genre ON Highly_Rated_Books.book_id = Genre.book_id
      GROUP BY author_id, genre_name
      HAVING COUNT(*) >=3;
  
      ;               
      `,
        {},
        {
          outFormat: oracledb.OBJECT,
          maxRows: 10
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
//--------------------------------------------

function smimilarTitles(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  var str=req.params.str
  console.log(req.params.str, typeof req.params.str);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT title, book_id, average_rating
        FROM BOOK
        WHERE title LIKE '%${str}%';`,
        {},
        {
          outFormat: oracledb.OBJECT,
          
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

function getAuthor(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  var author_id=req.params.author_id
  console.log(req.params.author_id, typeof req.params.author_id);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT name
        FROM Author 
        WHERE author_id = ${author_id}`,
        {},
        {
          outFormat: oracledb.OBJECT,
          
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

function getReview(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  var book_id=req.params.book_id
  console.log(req.params.book_id, typeof req.params.book_id);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT review_text
        FROM Review
        WHERE book_id = ${book_id}`,
        {},
        {
          outFormat: oracledb.OBJECT,
          
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

function getBooksByAuthor(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  var author_id=req.params.author_id
  console.log(req.params.author_id, typeof req.params.author_id);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT * 
        FROM authorof JOIN book ON authorof.book_id=book.book_id
        WHERE author_id=${author_id};
        `,
        {},
        {
          outFormat: oracledb.OBJECT,
          
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
        `SELECT * FROM BOOK WHERE TITLE LIKE '%${req.params.query}%'`,
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
