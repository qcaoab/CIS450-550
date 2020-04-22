import { put, takeLatest, all } from "redux-saga/effects";
import { BOOK, QUERY, SEARCH } from "../actionTypes";

function* queryPopularBooks() {
  console.log("Fetching");
  const json = yield fetch(`http://localhost:8081/randomBooks`, {
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

export default function* rootSaga() {
  yield all([yield takeLatest(QUERY.POPULAR_BOOKS, queryPopularBooks)]);
}
