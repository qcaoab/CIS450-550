var config = require("./db-config.js");
const oracledb = require("oracledb");

oracledb.createPool(config);

function randomBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT *
        FROM BOOK
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

function popularBooks(req, res) {
  let conn; // Declared here for scoping purposes.
  let empId = 1;
  console.log(req.params.num, typeof req.params.num);
  oracledb
    .getConnection()
    .then(function (c) {
      console.log("Connected to database");
      conn = c;
      return conn.execute(
        `SELECT * FROM (
          SELECT book_id
          FROM Review
          GROUP BY book_id
          ORDER BY COUNT(*) DESC
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

// The exported functions, which can be accessed in index.js.
module.exports = {
  randomBooks,
  popularBooks
};
