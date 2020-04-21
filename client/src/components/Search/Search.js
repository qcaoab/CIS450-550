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
  PaginationLink
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
                  {this.props.data.search_results
                    ? this.props.data.search_results
                        .slice(
                          currentPage * this.pageSize,
                          (currentPage + 1) * this.pageSize
                        )
                        .map((obj) => <SearchResultsCard {...obj} />)
                    : "No Books Found"}
                </div>
              </Col>
            </Row>
            <React.Fragment>
              <div className="pagination-wrapper">
                <Pagination aria-label="Page navigation example">
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      onClick={(e) => this.handleClick(e, currentPage - 1)}
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

                  <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                    <PaginationLink
                      onClick={(e) => this.handleClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            </React.Fragment>
          </div>
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
