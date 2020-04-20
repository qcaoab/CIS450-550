import React from "react";
import PageNavbar from "../PageNavbar";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "reactstrap";
import { BookModal } from "../Book/BookModal";

class _Trivia extends React.Component {
  render() {
    return (
      <div className="Search">
        <PageNavbar active="trivia" />
        <div className="container search-container">
          <div className="jumbotron">
            <div className="h3">Search</div>

            <Row>
              <Col lg={2}></Col>
              <Col lg={10}>
                <div className="input-container"></div>
                <div className="header-container"></div>
              </Col>
            </Row>
          </div>
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
