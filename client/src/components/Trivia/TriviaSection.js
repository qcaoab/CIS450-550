import React from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { getPopularBooks } from "../../redux/actions";
import { QUERY } from "../../redux/actionTypes";

const _TriviaSection = (props) => (
  <React.Fragment>
    <div className="mb-4">
      <h6>
        Which books people are more likely to write reviews on?<span> </span>
        <Button onClick={props.getPopularBooks} color={"primary"}>
          Get Results
        </Button>
      </h6>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Book Cover</th>
            <th>Title</th>
            <th>Description</th>
            <th>Format</th>
            <th>ISBN</th>
            <th>Publication Year</th>
            <th>Number of Pages</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {props.data.trivia_results[QUERY.POPULAR_BOOKS] &&
            props.data.trivia_results[QUERY.POPULAR_BOOKS].map((obj, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={obj.IMAGE_URL ? obj.IMAGE_URL : ""}
                    alt=""
                    style={{ height: "100%" }}
                  />
                </td>
                <td>{obj.TITLE ? obj.TITLE : ""}</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  </React.Fragment>
);
const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};
export const TriviaSection = connect(mapStateToProps, { getPopularBooks })(
  _TriviaSection
);
