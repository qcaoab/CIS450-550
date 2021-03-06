import React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsCard } from "../Search/SearchResultCard";
import {
  Row,
  Col,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { getAuthorBooks } from "../../redux/actions";

class _Authors extends React.Component {
  constructor() {
    super();

    this.pageSize = 5;

    this.state = {
      currentPage: 0
    };
  }
  componentDidMount() {
    this.props.dispatch(
      getAuthorBooks(this.props.data.author_page_info.AUTHOR_ID)
    );
  }
  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  render() {
    this.pagesCount = Math.ceil(
      this.props.data.author_books.length / this.pageSize
    );

    const { currentPage } = this.state;
    const author_info = this.props.data.author_page_info;

    return (
      <div>
        <div style={{ paddingLeft: 30, paddingTop: 20 }}>
          <div
            className="h2"
            style={{
              position: "fixed",
              zIndex: 2,
              backgroundColor: "#fffff3",
              width: "100%",
              height: 90,
              marginTop: -40
            }}
          >
            <p></p>
          </div>
          <div className="h2" style={{ position: "fixed", zIndex: 2 }}>
            Authors
          </div>
          <div style={{ height: 65 }}></div>
          {0 && this.props.data.author_loading ? (
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
              <Col
                lg={3}
                style={{
                  borderRight: "3px solid beige",
                  alignContent: "center"
                }}
              >
                <div class="position-fixed" style={{ width: 240 }}>
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
                </div>
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
                <div style={{ textAlign: "center" }}>
                  <span>
                    Average Rating:{" "}
                    {Math.round(
                      (author_info.AVERAGE_RATING + Number.EPSILON) * 100
                    ) / 100}
                    /5
                  </span>
                  <span className="mx-2">·</span>
                  <span>
                    Ratings:{" "}
                    {author_info.RATING_COUNT ? author_info.RATING_COUNT : "NA"}
                  </span>
                  <span className="mx-2">·</span>
                  <span>
                    Reviews:{" "}
                    {author_info.TEXT_REVIEW_COUNT
                      ? author_info.TEXT_REVIEW_COUNT
                      : "NA"}
                  </span>
                </div>
                <div class="h4">Books</div>
                {this.props.data.author_books_loading ? (
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
                ) : this.props.data.author_books &&
                  this.props.data.author_books.length ? (
                  <React.Fragment>
                    {this.props.data.author_books
                      .slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                      )
                      .map((obj) => (
                        <SearchResultsCard book_info={obj} />
                      ))}
                    <div
                      className="pagination-wrapper"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        paddingTop: 10
                      }}
                    >
                      <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={currentPage <= 0}>
                          <PaginationLink
                            onClick={(e) =>
                              this.handleClick(e, currentPage - 1)
                            }
                            previous
                            href="#"
                          />
                        </PaginationItem>

                        {[...Array(this.pagesCount)].map((page, i) => (
                          <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink
                              onClick={(e) => this.handleClick(e, i)}
                              href="#"
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem
                          disabled={currentPage >= this.pagesCount - 1}
                        >
                          <PaginationLink
                            onClick={(e) =>
                              this.handleClick(e, currentPage + 1)
                            }
                            next
                            href="#"
                          />
                        </PaginationItem>
                      </Pagination>
                    </div>
                  </React.Fragment>
                ) : (
                  <div style={{ textAlign: "center", paddingTop: 5 }}>
                    <span>No Books Found</span>
                  </div>
                )}
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
export default connect(mapStateToProps, null)(_Authors);
