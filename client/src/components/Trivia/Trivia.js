import React from "react";
import PageNavbar from "../PageNavbar";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Jumbotron } from "reactstrap";

class _Trivia extends React.Component {
  render() {
    return (
      <div className="Search">
        <PageNavbar active="trivia" />
        <div className="container search-container">
          <Jumbotron style={{ backgroundColor: "#FFFFF3", paddingTop: 30 }}>
            <div className="h2">Trivia</div>

            <Row>
              <Col lg={2}></Col>
              <Col lg={10}>
                <div className="input-container"></div>
                <div className="header-container"></div>
              </Col>
            </Row>
          </Jumbotron>
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
