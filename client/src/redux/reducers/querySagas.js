import {
  put,
  takeLatest,
  all,
  take,
  takeEvery,
  fork
} from "redux-saga/effects";
import { QUERY } from "../actionTypes";
import { REHYDRATE } from "redux-persist";
function* executeQuery1(action) {
  console.log("test3");
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}

function* logActions() {
  console.log("asdf");
  while (true) {
    const action = yield take(); // correct
    console.log(action);
  }
}

function* executeQuery2(action) {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}

function* actionWatcher1(action) {
  console.log("test2");
  yield takeEvery(QUERY.POPULAR_BOOKS, logActions);
}
function* actionWatcher2(action) {
  yield takeLatest(QUERY.BEST_REVIEWS, executeQuery2);
}

// export default function* rootSaga() {
//   console.log("running sagas");
//   // yield takeLatest(QUERY.POPULAR_BOOKS, executeQuery1);
//   // yield takeLatest(QUERY.MOST_GENRE_AUTHOR, executeQuery2);
//   yield all([
//     // logActions
//     actionWatcher1()
//     // actionWatcher2()
//     // actionWatcher3(),
//     // actionWatcher4(),
//     // actionWatcher5(),
//     // actionWatcher6(),
//     // actionWatcher7(),
//     // actionWatcher8(),
//     // actionWatcher9()
//   ]);
// }

export default function* rootSaga() {
  console.log("Waiting for rehydration");
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  console.log("Rehydrated");
  yield all([actionWatcher1]);
}
