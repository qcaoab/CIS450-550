import React from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { getPopularBooks } from "../../redux/actions";
import { QUERY } from "../../redux/actionTypes";
import { executeQuery } from "../../redux/actions";

const trivia_tables = {
  [QUERY.POPULAR_BOOKS]: {
    ranking: true,
    question: "1. Which books are people are more likely to write reviews on?",
    headings: ["Title", "Review Count"],
    cols: ["TITLE", "TEXT_REVIEWS_COUNT"]
  },
  [QUERY.BEST_REVIEWS]: {
    ranking: true,
    question:
      "2. What are the best reviews? (reviews with the most number of votes)",
    headings: ["Book Title", "Review Text", "Number of Votes"],
    cols: ["TITLE", "REVIEW_TEXT", "N_VOTES"]
  },
  [QUERY.MOST_CONSISTENT_AUTHOR]: {
    ranking: true,
    question: "3. Which author writes the best books most consistently?",
    headings: ["Name", "Average Rating", "Rating Count"],
    cols: ["NAME", "AVERAGE_RATING", "RATING_COUNT"]
  },
  [QUERY.HIGHEST_RATED_BOOKS_PER_GENRE_YEAR]: {
    ranking: false,
    question:
      "4. What are the highest-rated books of each genre in each decade?",
    headings: ["Decade", "Genre", "Title", "Rating"],
    cols: ["DECADE", "GENRE_NAME", "TITLE", "RATING"]
  },
  [QUERY.MOST_CONTROVERSIAL_BOOKS]: {
    ranking: true,
    question: "5. What are the most controversial books?",
    headings: ["Title", "Standard Deviation of Ratings"],
    cols: ["TITLE", "STDEV"]
  },
  [QUERY.ONE_HIT_WONDER]: {
    ranking: false,
    question: "6. What are the “one-hit wonder” author and books?",
    headings: ["Author Name", "Book Title"],
    cols: ["NAME", "TITLE"]
  },
  [QUERY.PROLIFIC_AUTHOR]: {
    ranking: false,
    question: "7. Who is the most prolific author in each genre?",
    headings: ["Genre", "Author Name", "Books Written"],
    cols: ["GENRE_NAME", "NAME", "NUM"]
  },
  [QUERY.CROSS_GENRE_AUTHOR]: {
    ranking: false,
    question:
      "8. Which author has written more than one book that is highly rated in multiple genres?",
    headings: ["Name"],
    cols: ["NAME"]
  },
  [QUERY.MOST_GENRE_AUTHOR]: {
    ranking: true,
    question:
      "9. Which authors have written books in the most number of genres?",
    headings: ["Name", "Genre Count"],
    cols: ["NAME", "GENRE_NUM"]
  }
};

const _TriviaSection = (props) => {
  const table_info = trivia_tables[props.query];
  return (
    <React.Fragment>
      <div className="mb-4">
        <div
          className="h6"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <p style={{ margin: "auto", marginLeft: 0 }}>{table_info.question}</p>
          <Button
            onClick={() => props.dispatch(executeQuery(props.query))}
            color={"primary"}
          >
            Get Results
          </Button>
        </div>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              {table_info.ranking && <th>#</th>}
              {table_info.headings.map((obj) => (
                <th>{obj}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.trivia_results[props.query] &&
              props.data.trivia_results[props.query].map((obj, idx) => (
                <tr>
                  {table_info.ranking && <td>{idx + 1}</td>}
                  {table_info.headings.map((heading, col_idx) => {
                    switch (heading) {
                      case "Book Cover":
                        return (
                          <td>
                            <img
                              src={obj.IMAGE_URL ? obj.IMAGE_URL : ""}
                              alt=""
                              style={{ height: "100%" }}
                            />
                          </td>
                        );
                      case "Rating":
                      case "Standard Deviation of Ratings":
                        return (
                          <td>
                            {obj[table_info.cols[col_idx]]
                              ? Math.round(
                                  (obj[table_info.cols[col_idx]] +
                                    Number.EPSILON) *
                                    1000
                                ) / 1000
                              : "N/A"}
                          </td>
                        );
                      default:
                        return (
                          <td>
                            {obj[table_info.cols[col_idx]]
                              ? obj[table_info.cols[col_idx]]
                              : "N/A"}
                          </td>
                        );
                    }
                  })}

                  {/* <td>{obj.TITLE ? obj.TITLE : ""}</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};
export const BookTriviaSection = connect(mapStateToProps)(_TriviaSection);
