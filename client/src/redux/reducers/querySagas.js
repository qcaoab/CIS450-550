import { put, takeLatest, all } from "redux-saga/effects";
import { BOOK, QUERY, SEARCH, DISCOVER, AUTHOR } from "../actionTypes";
import { executeQuery } from "../actions";

function* searchBooks() {
  console.log("Fetching");
  const json = yield fetch(`http://localhost:8081/randomBooks/10`, {
    method: "GET"
  }).then(
    (res) => {
      return res.json();
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  yield put({
    type: SEARCH.UPDATE_RESULTS,
    json: json || [{ error: json.message }]
  });
}

function* discoverQueryBooks() {
  console.log("Fetching");
  const json = yield fetch(`http://localhost:8081/randomBooks/24`, {
    method: "GET"
  }).then(
    (res) => {
      return res.json();
    },
    (err) => {
      console.log(err);
      return err;
    }
  );
  if (json != "TypeError: Failed to fetch") {
    yield put({
      type: DISCOVER.UPDATE_RESULTS,
      json: json
    });
  }
}

// function* queryPopularBooks() {
//   console.log("Fetching");
//   const json = yield fetch(
//     "https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc"
//   ).then((response) => response.json());

//   yield put({
//     type: BOOK.TOGGLE_MODAL,
//     json: json.articles || [{ error: json.message }]
//   });
// }

function* triviaPopularBooks() {
  console.log("Fetching");
  const json = yield fetch(`http://localhost:8081/popularBooks`, {
    method: "GET"
  }).then(
    (res) => {
      return res.json();
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  yield put({
    type: QUERY.UPDATE_RESULTS,
    json: json || [{ error: json.message }],
    query: QUERY.POPULAR_BOOKS
  });
}

function* executeQuerySaga({ query }) {
  console.log("Fetching");
  let url = `http://localhost:8081/triviaQuery/${query}`;
  const json = yield fetch(url, {
    method: "GET"
  }).then(
    (res) => {
      return res.json();
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  yield put({
    type: QUERY.UPDATE_RESULTS,
    json: json || [{ error: json.message }],
    query: query
  });
}

function* fetchAuthorData({ book }) {
  console.log("Fetching");
  const json = yield fetch(
    `http://localhost:8081/getAuthorInfo/${book.BOOK_ID}`,
    {
      method: "GET"
    }
  ).then(
    (res) => {
      return res.json();
    },
    (err) => {
      console.log(err);
      return err;
    }
  );

  yield put({
    type: AUTHOR.UPDATE,
    json: json || [{ error: json.message }]
  });
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(SEARCH.SUBMIT_SEARCH, searchBooks),
    yield takeLatest(QUERY.POPULAR_BOOKS, triviaPopularBooks),
    yield takeLatest(QUERY.EXECUTE_QUERY, executeQuerySaga),
    yield takeLatest(DISCOVER.QUERY_BOOKS, discoverQueryBooks),
    yield takeLatest(BOOK.UPDATE_SHOW_MODAL, fetchAuthorData)
  ]);
}
