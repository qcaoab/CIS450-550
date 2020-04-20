import React from "react";
import PageNavbar from "../PageNavbar";
import SearchRow from "./SearchRow";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsCard } from "./SearchResultCard";
import { SearchResultsHeader } from "./SearchResultHeader";
import { Row, Col } from "reactstrap";
import { BookModal } from "../Book/BookModal";

class _Search extends React.Component {
  render() {
    return (
      <div className="Search">
        <PageNavbar active="search" />
        <div className="container search-container">
          <div className="jumbotron">
            <div className="h3">Search</div>

            <Row>
              <Col lg={2}></Col>
              <Col lg={10}>
                <div className="input-container">
                  <SearchResultsHeader />
                </div>
                <div className="header-container">
                  {this.props.search.results &&
                    this.props.search.results.map((obj) => (
                      <SearchResultsCard {...obj} />
                    ))}
                </div>
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
export default connect(mapStateToProps, { updateSearchQuery })(_Search);
