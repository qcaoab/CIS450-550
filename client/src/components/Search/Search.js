import React from "react";
import PageNavbar from "../PageNavbar";
import SearchRow from "./SearchRow";
import "../../style/Search.css";
import { connect } from "react-redux";
import { updateSearchQuery } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsCard } from "./SearchResultCard";
import { SearchResultsHeader } from "./SearchResultHeader";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner
} from "reactstrap";
import { BookModal } from "../Book/BookModal";

class _Search extends React.Component {
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
            Search
          </div>
          <div style={{ height: 65 }}></div>
          <Row>
            <Col lg={1}></Col>
            <Col lg={10}>
              <div style={{ paddingTop: 5 }}>
                <SearchResultsHeader />
              </div>

              <div className="header-container">
                {this.props.data.loading ? (
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
                ) : this.props.data.search_results ? (
                  <React.Fragment>
                    {this.props.data.search_results
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
                    <span>No Reviews Found</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};
export default connect(mapStateToProps, { updateSearchQuery })(_Search);
