import React from "react";
import PageNavbar from "../PageNavbar";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Jumbotron } from "reactstrap";
import { TriviaSection } from "./TriviaSection";

class _Trivia extends React.Component {
  render() {
    return (
      <div className="Search">
        <div style={{ paddingLeft: 20, paddingTop: 20 }}>
        <div className="h2" style={{ paddingLeft: 10 }}>
          Trivia
          </div>
          <br />

          <Row>
            <TriviaSection />
          </Row>
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
