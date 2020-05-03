import React from "react";
import PageNavbar from "../PageNavbar";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Jumbotron } from "reactstrap";
import { BookTriviaSection } from "./BookTriviaSection";
import { QUERY } from "../../redux/actionTypes";

class _Trivia extends React.Component {
  render() {
    return (
      <div className="Search">
        <div style={{ paddingLeft: 30, paddingTop: 20 }}>
          <div className="h2">Trivia</div>
          <br />

          <Col>
            <BookTriviaSection query={QUERY.POPULAR_BOOKS} />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.BEST_REVIEWS} />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.MOST_CONSISTENT_AUTHOR} />
          </Col>
          <Col>
            <BookTriviaSection
              query={QUERY.HIGHEST_RATED_BOOKS_PER_GENRE_YEAR}
            />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.MOST_CONTROVERSIAL_BOOKS} />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.ONE_HIT_WONDER} />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.PROLIFIC_AUTHOR} />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.CROSS_GENRE_AUTHOR} />
          </Col>
          <Col>
            <BookTriviaSection query={QUERY.MOST_GENRE_AUTHOR} />
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state;
  return { search };
};
export default connect(mapStateToProps, { updateSearchQuery })(_Trivia);
