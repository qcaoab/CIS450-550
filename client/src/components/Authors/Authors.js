import React from "react";
import PageNavbar from "../PageNavbar";
import SearchRow from "../Search/SearchRow";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsCard } from "../Search/SearchResultCard";
import { Row, Col, Spinner } from "reactstrap";

class _Authors extends React.Component {
  constructor() {
    super();

    this.pageSize = 5;

    this.state = {
      currentPage: 0
    };
  }
  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  render() {
    this.pagesCount = Math.ceil(
      this.props.data.search_results.length / this.pageSize
    );

    const { currentPage } = this.state;
    const author_info = this.props.data.author_page_info;

    return (
      <div>
        <div style={{ paddingLeft: 30, paddingTop: 20 }}>
          <div className="h2">Author</div>
          <br />
          {this.props.data.author_loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Row>
              <Col lg={3} style={{ borderRight: "3px solid beige" }}>
                <div className="h2" style={{ textAlign: "center" }}>
                  {this.props.data.author_page_info
                    ? author_info.NAME
                    : "Anonymous"}
                </div>
                <img
                  src={
                    author_info.IMAGE_URL
                      ? author_info.IMAGE_URL
                      : "https://s.gr-assets.com/assets/nophoto/user/u_200x266-e183445fd1a1b5cc7075bb1cf7043306.png"
                  }
                  alt="author image"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col lg={9}>
                {author_info.AUTHOR_DESC && (
                  <div>
                    <div class="h4">Biography</div>
                    {author_info.AUTHOR_DESC}
                  </div>
                )}
                <br />
                {author_info.INFO && (
                  <div>
                    <div class="h4">Information</div>
                    {author_info.INFO.DATA_TITLE.map((e, i) => {
                      return (
                        <div style={{ paddingTop: 5 }}>
                          <span className="h6">{e + ": "}</span>
                          {author_info.INFO.DATA_ITEM[i]}
                        </div>
                      );
                    })}
                  </div>
                )}
                <br />
                <div class="h4">Statistics</div>
                <div style={{ textAlign: "center", padding: 20 }}>
                  <span class="h5">
                    Average Rating:{" "}
                    {author_info.AVERAGE_RATING
                      ? author_info.AVERAGE_RATING
                      : "NA"}
                    /5
                  </span>
                  <span className="mx-2">·</span>
                  <span class="h5">
                    Ratings:{" "}
                    {author_info.RATING_COUNT ? author_info.RATING_COUNT : "NA"}
                  </span>
                  <span className="mx-2">·</span>
                  <span class="h5">
                    Reviews:{" "}
                    {author_info.TEXT_REVIEW_COUNT
                      ? author_info.TEXT_REVIEW_COUNT
                      : "NA"}
                  </span>
                </div>
                <span class="h4">Books</span>
                {this.props.data.author_books
                  ? this.props.data.author_books
                      .slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                      )
                      .map((obj) => <SearchResultsCard book_info={obj} />)
                  : "No Books Found"}
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};
export default connect(mapStateToProps, { updateSearchQuery })(_Authors);
