import React from "react";
import PageNavbar from "./PageNavbar";
import SearchRow from "./Search/SearchRow";
import "../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsCard } from "./Search/SearchResultCard";

class _Search extends React.Component {
  render() {
    return (
      <div className="Search" max-width="300px">
        <PageNavbar active="search" />

        <div className="container search-container">
          <div className="jumbotron" >
            <div className="h5">Search</div>
            <br></br>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter book Name"
                onChange={this.props.updateSearchQuery}
                id="bookName"
                className="book-input"
              />
              <button
                id="submitbookBtn"
                className="submit-btn"
                onClick={this.props.submitSearch}
              >
                Submit
              </button>
            </div>
            <div className="header-container">
              {this.props.search.results &&
                this.props.search.results.map((obj) => (
                  <SearchResultsCard {...obj} />
                ))}
              <div className="headers">
                <div className="header">
                  <strong>Title</strong>
                </div>
                <div className="header">
                  <strong>book ID</strong>
                </div>
                <div className="header">
                  <strong>Rating</strong>
                </div>
                <div className="header">
                  <strong>Vote Count</strong>
                </div>
              </div>
            </div>
            <div className="results-container" id="results"></div>
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
