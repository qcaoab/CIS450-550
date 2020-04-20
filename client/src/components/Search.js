import React from "react";
import PageNavbar from "./PageNavbar";
import SearchRow from "./SearchRow";
import "../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";

class _Search extends React.Component {
  render() {
    return (
      <div className="Search">
        <PageNavbar active="search" />

        <div className="container search-container">
          <div className="jumbotron">
            <div className="h5">Search</div>
            <br></br>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter Movie Name"
                onChange={this.props.updateSearchQuery}
                id="movieName"
                className="movie-input"
              />
              <button
                id="submitMovieBtn"
                className="submit-btn"
                onClick={this.props.submitSearch}
              >
                Submit
              </button>
            </div>
            <div className="header-container">
              <div className="h6">You may like ...</div>
              <div className="headers">
                <div className="header">
                  <strong>Title</strong>
                </div>
                <div className="header">
                  <strong>Movie ID</strong>
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
