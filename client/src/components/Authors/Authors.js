import React from "react";
import PageNavbar from "../PageNavbar";
import SearchRow from "../Search/SearchRow";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsCard } from "../Search/SearchResultCard";
import { Row, Col, Jumbotron } from "reactstrap";

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
    return (
      <div className="Search">
        <PageNavbar active="search" />
        <div className="container search-container">
          <Jumbotron style={{ backgroundColor: "#FFFFF3", paddingTop: 30 }}>
            <Row>
              <Col lg={3} style={{ borderRight: "3px solid beige" }}>
                <div className="h2" style={{ textAlign: "center" }}>
                  {this.props.data.author_page_info
                    ? this.props.data.author_page_info.NAME
                    : "Author Name"}
                </div>
                <img
                  src={
                    "https://images.gr-assets.com/authors/1394355831p8/6991433.jpg"
                  }
                  alt="author image"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col lg={9}>
                <span class="h4">Statistics</span>
                <br />
                <div style={{ textAlign: "center", padding: 20 }}>
                  <span class="h5">
                    Average Rating:{" "}
                    {this.props.data.author_page_info.AVERAGE_RATING
                      ? this.props.data.author_page_info.AVERAGE_RATING
                      : "NA"}
                    /5
                  </span>
                  <span className="mx-2">·</span>
                  <span class="h5">
                    Ratings:{" "}
                    {this.props.data.author_page_info.RATING_COUNT
                      ? this.props.data.author_page_info.RATING_COUNT
                      : "NA"}
                  </span>
                  <span className="mx-2">·</span>
                  <span class="h5">
                    Reviews:{" "}
                    {this.props.data.author_page_info.TEXT_REVIEW_COUNT
                      ? this.props.data.author_page_info.TEXT_REVIEW_COUNT
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
          </Jumbotron>
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
