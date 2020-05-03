import { put, takeLatest, all, select } from "redux-saga/effects";
import { BOOK, QUERY, SEARCH, DISCOVER, AUTHOR } from "../actionTypes";
import { executeQuery } from "../actions";

const getSearchString = (state) => state.data.search_query;

function* searchBooks() {
  console.log("Fetching");
  let search = yield select(getSearchString);
  console.log(search);
  if (search) {
    const json = yield fetch(`http://localhost:8081/sear`, {
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
        type: SEARCH.UPDATE_RESULTS,
        json: json
      });
    }
  } else {
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
    if (json != "TypeError: Failed to fetch") {
      yield put({
        type: SEARCH.UPDATE_RESULTS,
        json: json
      });
    }
  }

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
  if (json != "TypeError: Failed to fetch") {
    yield put({
      type: QUERY.UPDATE_RESULTS,
      json: json,
      query: QUERY.POPULAR_BOOKS
    });
  }
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
  if (json != "TypeError: Failed to fetch") {
    yield put({
      type: QUERY.UPDATE_RESULTS,
      json: json,
      query: query
    });
  }
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
  if (json != "TypeError: Failed to fetch") {
    yield put({
      type: AUTHOR.UPDATE,
      json: json
    });
  }
}

function* fetchAuthorBooks({ author_id }) {
  console.log("Fetching");
  const json = yield fetch(
    `http://localhost:8081/getAuthorBooks/${author_id}`,
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
  if (json != "TypeError: Failed to fetch") {
    yield put({
      type: AUTHOR.UPDATE_BOOKS,
      json: json
    });
  }
}

function* fetchBookReviews({ book }) {
  console.log("Fetching");
  const json = yield fetch(
    `http://localhost:8081/getBookReviews/${book.BOOK_ID}`,
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
  if (json != "TypeError: Failed to fetch") {
    yield put({
      type: BOOK.UPDATE_REVIEWS,
      json: json
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(SEARCH.SUBMIT_SEARCH, searchBooks),
    yield takeLatest(QUERY.POPULAR_BOOKS, triviaPopularBooks),
    yield takeLatest(QUERY.EXECUTE_QUERY, executeQuerySaga),
    yield takeLatest(DISCOVER.QUERY_BOOKS, discoverQueryBooks),
    yield takeLatest(BOOK.UPDATE_SHOW_MODAL, fetchAuthorData),
    yield takeLatest(AUTHOR.GET_BOOKS, fetchAuthorBooks),
    yield takeLatest(BOOK.UPDATE_SHOW_MODAL, fetchBookReviews)
  ]);
}
