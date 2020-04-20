import { put, takeLatest, all } from "redux-saga/effects";
import { QUERY } from "../actionTypes";
function* executeQuery1() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery2() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery3() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery4() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery5() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery6() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery7() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery8() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}
function* executeQuery9() {
  const json = yield fetch(`http://localhost:8081/randombooks`, {
    method: "GET"
  }).then((response) => response.json());
  yield put({ type: "UPDATE_RESULTS", json: json.articles });
}

function* actionWatcher1() {
  yield takeLatest(QUERY.POPULAR_BOOKS, executeQuery1);
}
function* actionWatcher2() {
  yield takeLatest(QUERY.BEST_REVIEWS, executeQuery2);
}
function* actionWatcher3() {
  yield takeLatest(QUERY.MOST_CONSISTENT_AUTHOR, executeQuery3);
}
function* actionWatcher4() {
  yield takeLatest(QUERY.HIGHEST_RATED_BOOKS_PER_GENRE_YEAR, executeQuery4);
}
function* actionWatcher5() {
  yield takeLatest(QUERY.MOST_CONTROVERSIAL_BOOKS, executeQuery5);
}
function* actionWatcher6() {
  yield takeLatest(QUERY.ONE_HIT_WONDER, executeQuery6);
}
function* actionWatcher7() {
  yield takeLatest(QUERY.PROLIFIC_AUTHOR, executeQuery7);
}
function* actionWatcher8() {
  yield takeLatest(QUERY.CROSS_GENRE_AUTHOR, executeQuery8);
}
function* actionWatcher9() {
  yield takeLatest(QUERY.MOST_GENRE_AUTHOR, executeQuery9);
}
export default function* rootSaga() {
  yield all([
    actionWatcher1(),
    actionWatcher2(),
    actionWatcher3(),
    actionWatcher4(),
    actionWatcher5(),
    actionWatcher6(),
    actionWatcher7(),
    actionWatcher8(),
    actionWatcher9()
  ]);
}
